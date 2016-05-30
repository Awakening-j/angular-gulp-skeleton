'use strict';

angular.module('app').controller('RegisterCtrl',
    function($scope, $state, RegisterService) {
    	$scope.register = function(isValid){
    	    if(isValid){
    	    	$state.go('secure.login');
    	    }
    	};
    	         
    });