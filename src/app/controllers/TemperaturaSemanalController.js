(function () {
    angular
        .module('app')
        .controller('TemperaturaSemanalController', [
            'openWeahterAPI',
            '$window',
            '$rootScope',
            TemperaturaSemanalController
        ]);

    function TemperaturaSemanalController(openWeahterAPI,$window,$rootScope) {
        var vm = this;
        function getWeather(cidadeId) {
            openWeahterAPI.getWeather(cidadeId).then(function (data) {
                console.log("DATA",data.data.data[0]);
                vm.cidade = data.data.name;
                vm.climaSemanalList = data.data.data;
            });
        }

        getWeather($window.localStorage['idFavorito']);

        $rootScope.$on('cidadeAtualizada', function (event, data) {
            getWeather(data.id);
        });


    }
})();
