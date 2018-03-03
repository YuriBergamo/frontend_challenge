(function () {
    angular
        .module('app')
        .controller('TemperaturaController', [
            'openWeahterAPI',
            '$window',
            '$rootScope',
            TemperaturaController
        ]);

    function TemperaturaController(openWeahterAPI,$window,$rootScope) {
        var vm = this;
        if(!$window.localStorage['idFavorito']){
            //seta a cidade de blumenau como default
            $window.localStorage['idFavorito'] = "5090";
        }
        function getWeather(cidadeId) {
            openWeahterAPI.getWeather(cidadeId).then(function (data) {
                console.log("DATA",data.data.data[0]);
                vm.cidade = data.data.name;
                vm.clima = data.data.data[0];
            });
        }

        vm.getTemperatura = function () {
            if(vm.clima && vm.clima.temperature) {
                return (vm.clima.temperature.min + vm.clima.temperature.max) / 2;
            }
        };

        getWeather($window.localStorage['idFavorito']);

        $rootScope.$on('cidadeAtualizada', function (event, data) {
            getWeather(data.id);
        });


    }
})();
