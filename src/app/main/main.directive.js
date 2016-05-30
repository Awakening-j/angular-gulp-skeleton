'use strict';

angular.module('app')
	.directive('mainDirective', function() {
		return {
			restrict: 'A',
			link: function(scope, iElement, iAttrs){

			}
		}
	})

	.directive('navbarFixedTop', ['$timeout', function ($timeout) {
	    return {
	        restrict: 'C',
	        link: function (scope, iElement, iAttrs) {
	            $timeout(function(){
	                angular.element('body').css('padding-top', iElement.height() + 'px');
	            }, 50);
	            scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams){
	                angular.element('body').css('padding-top', iElement.height() + 'px');
	            });
	        }
	    };
	}]);