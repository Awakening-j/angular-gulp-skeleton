'use strict';

angular.module('app').controller('MainCtrl', 
	function ($scope) {
	  	$scope.navs = [{state: 'main.dashboard', label: 'Dashboard'},
	                  {state: 'main.plugin', label: 'Plugin'},
	                  {state: 'main.about', label: 'About'}];
	  	$scope.date = new Date();
	});
