(function ($) {
    //"use strict";

    function loadWeather(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'f',
            success: function (weather) { 
                html = '<div class="top">';
                html += '<i class="wi wi-yahoo-' + weather.code + '"></i>';
                html += '<div class="currently">' + weather.currently + '</div>'; 
                html += '<div class="updates">' + weather.forecast[0].day + ', ' + weather.forecast[0].date+ '</div>'; 
                html += '</div>';


                html += '<div class="middle">';
                html += '<div class="city">' + weather.city + '  <span> '+ weather.region + '</span></div>';
                html += '<div class="temp">' + weather.alt.temp + '<span>&deg;C</span> </div>'; 
                html += '</div>';
                
                html += '<div class="nextdays">';
                
                html += '<div class="days day2"><span class="d">' + weather.forecast[1].day + '</span> <span class="h">' + weather.forecast[1].alt.high + '&deg; </span> <span class="h">' + weather.forecast[1].alt.low + '&deg;  </div>';
                html += '<div class="days day3"><span class="d">' + weather.forecast[2].day + '</span> <span class="h">' + weather.forecast[2].alt.high + '&deg; </span> <span class="h">' + weather.forecast[2].alt.low + '&deg;  </div>';
                html += '<div class="days day4"><span class="d">' + weather.forecast[3].day + '</span> <span class="h">' + weather.forecast[3].alt.high + '&deg; </span> <span class="h">' + weather.forecast[3].alt.low + '&deg;  </div>';
                html += '<div class="days day5"><span class="d">' + weather.forecast[4].day + '</span> <span class="h">' + weather.forecast[4].alt.high + '&deg; </span> <span class="h">' + weather.forecast[4].alt.low + '&deg;  </div>';
                html += '<div class="days day1"><span class="d">' + weather.forecast[5].day + '</span> <span class="h">' + weather.forecast[5].alt.high + '&deg; </span> <span class="h">' + weather.forecast[5].alt.low + '&deg;  </div>';
                html += '</div>';

                $("#weather-one").html(html);
            },
            error: function (error) {
                $("#weather-one").html('<p>' + error + '</p>');
            }
        });
    }


    // init
    loadWeather('New York City', '');

})(jQuery);


(function ($) {
    //"use strict";

    function loadWeather(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'f',
            success: function (weather) {

                html = '<i class="wi wi-yahoo-' + weather.code + '"></i><h2> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
                html += '<div class="city">' + weather.city + ', ' + weather.region + '</div>';
                html += '<div class="currently">' + weather.currently + '</div>';
                html += '<div class="celcious">' + weather.alt.temp + '&deg;C</div>';

                $("#weather-two").html(html);
            },
            error: function (error) {
                $("#weather-two").html('<p>' + error + '</p>');
            }
        });
    }


    // init
    loadWeather('New York City', '');

})(jQuery);



(function ($) {
    //"use strict";

    function loadWeather(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'f',
            success: function (weather) {

                html = '<i class="wi wi-yahoo-' + weather.code + '"></i><h2> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
                html += '<div class="city">' + weather.city + ', ' + weather.region + '</div>';
                html += '<div class="currently">' + weather.currently + '</div>';
                html += '<div class="celcious">' + weather.alt.temp + '&deg;C</div>';

                $("#weather-three").html(html);
            },
            error: function (error) {
                $("#weather-three").html('<p>' + error + '</p>');
            }
        });
    }


    // init
    loadWeather('Sydney', '');

})(jQuery);


(function ($) {
    //"use strict";

    function loadWeather(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'f',
            success: function (weather) {

                html = '<i class="wi wi-yahoo-' + weather.code + '"></i><h2> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
                html += '<div class="city">' + weather.city + ', ' + weather.region + '</div>';
                html += '<div class="currently">' + weather.currently + '</div>';
                html += '<div class="celcious">' + weather.alt.temp + '&deg;C</div>';

                $("#weather-four").html(html);
            },
            error: function (error) {
                $("#weather-four").html('<p>' + error + '</p>');
            }
        });
    }


    // init
    loadWeather('New York', '');

})(jQuery);






