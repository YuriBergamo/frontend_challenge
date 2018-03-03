(function () {
    angular
        .module('app')
        .controller('ChartController', [
            'openWeahterAPI',
            '$window',
            '$rootScope',
            ChartController
        ]);

    function ChartController(openWeahterAPI, $window, $rootScope) {
        var vm = this;

        function getWeather(cidadeId) {
            openWeahterAPI.getWeather(cidadeId).then(function (data) {
                vm.cidade = data.data.name;
                vm.clima = data.data.data;
                console.log("Alterou a cidade do chart", cidadeId);
                vm.semanaChartData = getSemanaChart;
                vm.api.refresh();
            });
        }
        getWeather($window.localStorage['idFavorito']);

        $rootScope.$on('cidadeAtualizada', function (event, data) {
            getWeather(data.id);
        });

        function getSemanaChart() {
            var chartData = [];
            for(var i=0; i<vm.clima.length ; i++){
                var temp =vm.clima[i];
                var chartDataItem = {};
                chartDataItem.x = i;
                chartDataItem.y = parseInt(temp.temperature.min);
                chartData.push(chartDataItem);
            }
            console.log(chartData);
            return [ { values: chartData, color: 'rgb(0, 150, 136)', area: true } ];
        }

        vm.chartOptions = {
            chart: {
                type: 'lineChart',
                height: 210,
                width: 500,
                x: function (d) { return d.x },
                y: function (d) { return d.y },
                showLabels: false,
                showLegend: false,
                title: 'Próximos dias',
                showYAxis: false,
                showXAxis: false,
                tooltip: { contentGenerator: function (d) { return '<span class="custom-tooltip">' + d.point.y + '</span>' } }
            }
        };
    }
})();
