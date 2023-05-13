( function ( $ ) {
    "use strict";


    
 $.plot("#flotBar1", [{
  data: [[0, 3], [2, 8], [4, 5], [6, 13],[8,5], [10,7],[12,4], [14,6]],
  bars: {
    show: true,
    lineWidth: 0,
    fillColor: '#85c988'          
  }
}], {
  grid: {
    show: false,
    hoverable: true
  }
});



 var plot = $.plot($('#flotLine1'),[{
  data: [[0, 1], [1, 3], [2,6], [3, 5], [4, 7], [5, 8], [6, 10]],
  color: '#fff'
}],
{
  series: {
    lines: {
      show: false
    },
    splines: {
      show: true,
      tension: 0.4,
      lineWidth: 2
        //fill: 0.4
      },
      shadowSize: 0
    },
    points: {
      show: false,
    },
    legend: {
      noColumns: 1,
      position: 'nw'
    },
    grid: {
      hoverable: true,
      clickable: true,
      show: false
    },
    yaxis: {
      min: 0,
      max: 10,
      color: '#eee',
      font: {
        size: 10,
        color: '#6a7074'
      }
    },
    xaxis: {
      color: '#eee',
      font: {
        size: 10,
        color: '#6a7074'
      }
    }
  });

} )( jQuery );