'use strict';

angular.module('app')
    .directive('onEnter', function() {
        return function(scope, element, attrs) {
            element.on("keyup keypress", function(event) {
                if(event.which === 13) {
                    if (!scope.$$phase) {
                        scope.$apply(function(){
                            scope.$eval(attrs.onEnter);
                        });
                        event.preventDefault();
                    }
                }
            });
        };
    });