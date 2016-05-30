'use strict';

angular.module('app').controller('AppCtrl', 
    function ($scope, $rootScope, $localStorage, $state, IStorage) {
		$rootScope.user = {};

  		$scope.init = function(){
  			$rootScope.user = $localStorage[IStorage.user] || {};
  		};

  		$scope.logout = function(){
  		    $localStorage[IStorage.user] = undefined;
  		    $rootScope.user = {};
  		    $state.go('secure.login');
  		};
  		         

  		$scope.$watch('user', function(){
  			console.log('watch user', angular.toJson($rootScope.user));
  			$localStorage[IStorage.user] = $rootScope.user;
  		}, true);
  });