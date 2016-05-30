'use strict';

angular.module('app').controller('DashboardCtrl',
    function($scope, $timeout, DashboardService) {
        /**
         * ui-grid config
         */
        $scope.gridData = [];
        $scope.gridOptions = {
            data: 'gridData',
            enableSorting: true,
            enableGridMenu: true,
            paginationPageSizes: [15, 20, 30],
            paginationPageSize: 15,
            columnDefs: [
                // {name: 'No.', field: '', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}</div>' },
              { field: 'key'},
              { field: 'color'},
              { field: 'label'},
              { field: 'value', cellTooltip: 
                function( row, col ) {
                  return row.entity.value;
                }
              }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, updateChart);
                gridApi.selection.on.rowSelectionChangedBatch($scope, updateChart);
                gridApi.pagination.on.paginationChanged($scope, paginationChanged);
            }
        };  

        /**
         * jquery nvd3 config
         */
        var chart, chartData;

        /**
         * angular-nvd3 config
         */
        
        $scope.chartData = [];
        $scope.options = {
                chart: {
                    type: 'multiBarHorizontalChart',
                    height: 240,
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showControls: true,
                    showValues: true,
                    transitionDuration: 500,
                    xAxis: {
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Values',
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);
                        }
                    }
                }
            };

        $scope.init = function() {
            loadData();
        };

        /**
         * init jquery nvd3
         */
        var initNVD3 = function(data){
            nv.addGraph(function() {
                chart = nv.models.multiBarHorizontalChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .showValues(true)
                    .tooltips(true)
                    .showControls(true);

                chart.yAxis
                    .tickFormat(d3.format(',.2f'));

                chartData = d3.select('#chart svg').datum(data);
                chartData.transition().duration(500)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                $scope.$on('$destroy', function(){
                    window.onresize = null;
                    //TODO plugin issue, can't remove specific function, recommand to use latest version of nvd3
                    // $(window).off('resize', chart.update);
                });

                return chart;
            });
        };

        /**
         * loadData
         * init jquery nvd3
         * set angular-nvd3 data, set ui-grid data
         */
        var loadData = function() {
            DashboardService.loadJson('mockup/components/dashboard/chart.json')
            .then(function(response){
                initNVD3(response);
                $scope.chartData = response;
                $scope.gridData = formatToGridData(response);
                $timeout(function(){
                    $scope.gridApi.selection.selectAllRows();
                }, 200);
            });
        };

        var formatToGridData = function(data){
            var gridData = [];
            angular.forEach(data, function(d, index){
                angular.forEach(d.values, function(value){
                    gridData.push({
                        key: d.key,
                        color: d.color,
                        label: value.label,
                        value: value.value
                    });
                });
            });
            return gridData;
        };

        var formatToChartData = function(data){
            var chartData = [];
            var groups = _.groupBy(data, 'key');
            angular.forEach(groups, function(list, key){
                var dd = {
                    key: key,
                    color: list[0].color,
                    values: []
                };
                angular.forEach(list, function(obj){
                    dd.values.push({
                        label: obj.label,
                        value: obj.value
                    })
                });
                chartData.push(dd);
            });
            return chartData;
        };

        var updateChart = function updateChart(){
            var entities = $scope.gridApi.selection.getSelectedRows();
            var data = formatToChartData(entities);
            $scope.chartData = data;
            if(chartData){
                chartData.datum(data).transition().duration(500).call(chart);
                //fix no data issue 
                //bug: old chart will not remove if no data
                if(data.length == 0){
                    $timeout(function(){
                        $('#chart svg>g').remove();
                    }, 200);
                }
            };
        };

        var ajax = _.debounce(function(currentPage, pageSize){
                console.log('currentPage', currentPage, 'pageSize', pageSize)   
            }, 1000);

        var paginationChanged = function(currentPage, pageSize){
            //ajax
            ajax(currentPage, pageSize);
        };
    });