'use strict';

angular.module('app').controller('LoginCtrl',
    function($scope, $rootScope, $state, IStorage, LoginService) {
    	$scope.user = {
    		username: '',
    		password: ''
    	};
    	$scope.login = function(isValid){
    	    if(isValid){
    	    	$rootScope.user = angular.copy($scope.user);
    	    	$state.go('main.dashboard');
    	    }
    	};
    });