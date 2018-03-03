(function(){
    'use strict';

    angular.module('app')
        .service('openWeahterAPI', [
            '$q',
            '$http',
            openWeahterAPI
        ]);

    function openWeahterAPI($q, $http){
        var PATH_WEATHER = "http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/";
        var PATH_CITY = "http://apiadvisor.climatempo.com.br/api/v1/locale/city?";

        var PATH_WEATHER_CITYID = "/days/15?";
        var token = "token=7fb7233aac4df9f9089dedc34dc5dd80";
        return {
            getWeather : function(cityID) {
                return $http.get(PATH_WEATHER +cityID+PATH_WEATHER_CITYID+token);
            }
        };
    }

})();
