(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['chartist'], function (chartist) {
            return (root.returnExportsGlobal = factory(chartist));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('chartist'));
    } else {
        root['Chartist.plugins.legend'] = factory(root.Chartist);
    }
}(this, function (Chartist) {
    /**
     * This Chartist plugin creates a legend to show next to the chart.
     *
     */
    'use strict';

    var defaultOptions = {
        className: '',
        classNames: false,
        removeAll: false,
        legendNames: false,
        clickable: true,
        onClick: null,
        position: 'top'
    };

    Chartist.plugins = Chartist.plugins || {};

    Chartist.plugins.legend = function (options) {

        // Catch invalid options
        if (options && options.position) {
           if (!(options.position === 'top' || options.position === 'bottom' || options.position instanceof HTMLElement)) {
              throw Error('The position you entered is not a valid position');
           }
           if(options.position instanceof HTMLElement){
              // Detatch DOM element from options object, because Chartist.extend currently chokes on circular references present in HTMLElements
              var cachedDOMPosition = options.position;
              delete options.position;
           }
        }

        options = Chartist.extend({}, defaultOptions, options);

        if(cachedDOMPosition){
            // Reattatch the DOM Element position if it was removed before
            options.position = cachedDOMPosition
        }

        return function legend(chart) {
            var existingLegendElement = chart.container.querySelector('.ct-legend');
            if (existingLegendElement) {
                // Clear legend if already existing.
                existingLegendElement.parentNode.removeChild(existingLegendElement);
            }

            // Set a unique className for each series so that when a series is removed,
            // the other series still have the same color.
            if (options.clickable) {
                var newSeries = chart.data.series.map(function (series, seriesIndex) {
                    if (typeof series !== 'object') {
                        series = {
                            value: series
                        };
                    }

                    series.className = series.className || chart.options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex);
                    return series;
                });
                chart.data.series = newSeries;
            }

            var legendElement = document.createElement('ul'),
                isPieChart = chart instanceof Chartist.Pie;
            legendElement.className = 'ct-legend';
            if (chart instanceof Chartist.Pie) {
                legendElement.classList.add('ct-legend-inside');
            }
            if (typeof options.className === 'string' && options.className.length > 0) {
                legendElement.classList.add(options.className);
            }

            if (chart.options.width) {
                legendElement.style.cssText = 'width: ' + chart.options.width + 'px;margin: 0 auto;';
            }

            // Get the right array to use for generating the legend.
            var legendNames = chart.data.series,
                useLabels = isPieChart && chart.data.labels && chart.data.labels.length;
            if (useLabels) {
                var originalLabels = chart.data.labels.slice(0);
                legendNames = chart.data.labels;
            }
            legendNames = options.legendNames || legendNames;

            var legends = [];
            var seriesMetadata = new Array(chart.data.series.length);
            var activeLegendCount = 0;

            // Initialize the array that associates series with legends.
            // -1 indicates that there is no legend associated with it.
            for (var i = 0; i < chart.data.series.length; i++) {
               seriesMetadata[i] = {
                 data: chart.data.series[i],
                 label: useLabels ? chart.data.labels[i] : null,
                 legend: -1
               };
            }

            // Check if given class names are viable to append to legends
            var classNamesViable = (Array.isArray(options.classNames) && (options.classNames.length === legendNames.length));

            // Loop through all legends to set each name in a list item.
            legendNames.forEach(function (legend, i) {
               var legendText = legend.name || legend;
               var legendSeries = legend.series || [i];

               var li = document.createElement('li');
               li.className = 'ct-series-' + i;
               // Append specific class to a legend element, if viable classes are given
               if (classNamesViable) {
                  li.className += ' ' + options.classNames[i];
               }
               li.setAttribute('data-legend', i);
               li.textContent = legendText;
               legendElement.appendChild(li);

               legendSeries.forEach(function(seriesIndex) {
                  seriesMetadata[seriesIndex].legend = i;
               });

               legends.push({
                  text: legendText,
                  series: legendSeries,
                  active: true
               });

               activeLegendCount++;
            });

            chart.on('created', function (data) {
               // Append the legend element to the DOM
               if(!(options.position instanceof HTMLElement))
               {
                  switch (options.position) {
                     case 'top':
                        chart.container.insertBefore(legendElement, chart.container.childNodes[0]);
                        break;

                     case 'bottom':
                        chart.container.insertBefore(legendElement, null);
                        break;
                   }
               }
               else {
                  // Appends the legend element as the last child of a given HTMLElement
                  options.position.insertBefore(legendElement, null);
               }
            });

            if (options.clickable) {
                legendElement.addEventListener('click', function (e) {
                    var li = e.target;
                    if (li.parentNode !== legendElement || !li.hasAttribute('data-legend'))
                        return;
                    e.preventDefault();

                    var legendIndex = parseInt(li.getAttribute('data-legend'));
                    var legend = legends[legendIndex];

                    if (!legends[legendIndex].active) {
                        legend.active = true;
                        activeLegendCount++;
                        li.classList.remove('inactive');
                    } else {
                        legend.active = false;
                        activeLegendCount--;
                        li.classList.add('inactive');

                        if (!options.removeAll && activeLegendCount == 0) {
                           //If we can't disable all series at the same time, let's
                           //reenable all of them:
                           for (var i = 0; i < legends.length; i++) {
                              legends[i].active = true;
                              activeLegendCount++;
                              legendElement.childNodes[i].classList.remove('inactive');
                           }
                       }
                    }
                    
                    var newSeries = [];
                    var newLabels = [];

                    for (var i = 0; i < seriesMetadata.length; i++) {
                       if(seriesMetadata[i].legend != -1 && legends[seriesMetadata[i].legend].active) {
                          newSeries.push(seriesMetadata[i].data);
                          newLabels.push(seriesMetadata[i].label);
                       }
                    }

                    chart.data.series = newSeries;
                    if (useLabels) {
                        chart.data.labels = newLabels;
                    }

                    chart.update();

                    if (options.onClick) {
                        options.onClick(chart, e);
                    }
                });
            }
        };

    };

    return Chartist.plugins.legend;

}));
