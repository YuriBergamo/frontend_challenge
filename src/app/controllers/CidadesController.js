(function () {
    angular
        .module('app')
        .controller('CidadesController', [
            'citiesService',
            '$timeout', '$q',
            'openWeahterAPI',
            '$rootScope',
            '$window',
            '$mdToast',
            CidadesController
        ]);

    function CidadesController(citiesService,$timeout, $q,openWeahterAPI, $rootScope,$window,$mdToast) {
        var vm = this;
        vm.estadoSelecionado = null;
        vm.estadosList = citiesService.getAllStates();
        vm.cidadeSelecionada = null;
        vm.searchText = null;
        vm.cidadesList = [];
        vm.cidadeEncontradaAPI = null;
        vm.procurandoCidades = false;

        vm.getCidades = function () {
            vm.cidadeSelecionada = null;
            vm.cidadesList = [];
            if(vm.estadoSelecionado){
                citiesService.getCitiesByState(vm.estadoSelecionado).then(function (data) {
                    vm.cidadesList = data.data;
                });
            }
        };

        vm.querySearch  = function(query) {
            var results = query ? vm.cidadesList.filter( createFilterFor(query) ) : [];
            var deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        };

        function createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();
            return function filterFn(cidade) {
                return (cidade.name.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }

        vm.procurar = function () {
            vm.procurandoCidades = true;
            if(vm.estadoSelecionado && vm.cidadeSelecionada){
                $rootScope.$broadcast('cidadeAtualizada', vm.cidadeSelecionada);
                vm.cidadeEncontradaAPI = vm.cidadeSelecionada;
                $window.setTimeout(function () {
                    vm.procurandoCidades = false;
                }, 200);
            }else{
                console.log("DEU RUIM;")
            }
        };

        vm.favoritar = function () {
            if(vm.cidadeEncontradaAPI) {
                $window.localStorage['idFavorito'] = vm.cidadeEncontradaAPI.id;
                showToast(vm.cidadeEncontradaAPI.name  + " é seu novo favorito!", 2000);
            }else{
                showToast("Você precisa fazer a busca antes de favoritar uma cidade!", 2500);
            }
        };

        vm.isFavorito = function () {
            if(vm.cidadeSelecionada){
                return $window.localStorage['idFavorito'] == vm.cidadeSelecionada.id;
            }
        };

        function showToast(title, time) {
            $mdToast.show(
                $mdToast.simple()
                    .content(title)
                    .hideDelay(time)
                    .position('bottom right')
            );
        }



    }
})();
