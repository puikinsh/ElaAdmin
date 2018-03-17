(function ($) {
    //    "use strict";

    function loadWeather(location, woeid) {

        var codes = new Array();
            codes [0] = "Ciclón";
            codes [1] = "Tormenta tropical";
            codes [2] = "Huracán";
            codes [3] = "Tormentas severas";
            codes [4] = "Tormentas eléctricas";
            codes [5] = "Lluvia y nieve";
            codes [6] = "Lluvia y aguanieve";
            codes [7] = "Nieve y aguanieve";
            codes [8] = "Llovizna helada";
            codes [9] = "Llovizna";
            codes [10] = "Lluvia helada";
            codes [11] = "Lluvia";
            codes [12] = "Lluvia";
            codes [13] = "Ráfagas de nieve";
            codes [14] = "Nieve ligera";
            codes [15] = "Ventisca";
            codes [16] = "Nieve";
            codes [17] = "Granizo";
            codes [18] = "Aguanieve";
            codes [19] = "Polvo";
            codes [20] = "Niebla";
            codes [21] = "Neblina";
            codes [22] = "Humo";
            codes [23] = "Tormentoso";
            codes [24] = "Ventoso";
            codes [25] = "Frío";
            codes [26] = "Nublado";
            codes [27] = "Predominantemente nublado por la noche";
            codes [28] = "Mayormente nublado (día)";
            codes [29] = "Nublado por la noche";
            codes [30] = "Etiquetas cambiantes nubladas";
            codes [31] = "Noche despejada";
            codes [32] = "Soleado";
            codes [33] = "Agradable por la noche";
            codes [34] = "Día agradable";
            codes [35] = "Lluvia y granizo";
            codes [36] = "Calor";
            codes [37] = "Tormentas aisladas";
            codes [38] = "Tormentas dispersas";
            codes [39] = "Tormentas aisladas";
            codes [40] = "Lluvias dispersas";
            codes [41] = "Fuerte nevada";
            codes [42] = "Copos de nieve dispersos";
            codes [43] = "Fuerte Nevada";
            codes [44] = "Parcialmente nublado";
            codes [45] = "Tormentas";
            codes [46] = "Chubascos de nieve";
            codes [47] = "Lluvias aisladas de tormentas eléctricas";
            codes [3200] = "No disponible";


        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'c',

            success: function (weather) {

                console.log(weather);

                html = '<i class="wi wi-yahoo-' + weather.code + '"></i><h2> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
                //html += '<div class="city">' + weather.city + ', ' + weather.region + '</div>';
                html += '<div class="city">' + weather.city + ', ' + 'Andalucía' + '</div>';
                html += '<div class="currently">' + codes[weather.code] + '</div>';
                html += '<div class="celcious">' + weather.humidity + '% Humedad</div>';

                $("#weather-one").html(html);
            },
            error: function (error) {
                $("#weather-one").html('<p>' + error + '</p>');
            }
        });
    }


    // init

    loadWeather('Granada, SP', '56466677');

})(jQuery);
