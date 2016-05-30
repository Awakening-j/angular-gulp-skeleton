'use strict';

angular.module('app')
	.directive('dashboardResize', function($timeout) {
		return {
			restrict: 'A',
			priority: 99,
			link: function(scope, iElement, iAttrs){
				
				var resize = _.debounce(function() {
		            var winHeight = angular.element(window).height();
		            var gridHeight = (winHeight- 51 - 20 - 20);
		            scope.options.chart.height = gridHeight/2;
		            angular.element('#chart').height(gridHeight/2);
		            $timeout(function(){
		                angular.element(".grid").height(gridHeight);
		            }, 10);
		        }, 500);

		        $(window).on('resize', function(){
		        	resize();
		        });

            	resize();

            	iElement.on('$destroy', function () {
                    $(window).off('resize', resize);
                });
			}
		}
	});