'use strict';

angular.module('app').controller('PluginCtrl',
	function($scope, PluginService) {
		$scope.dropdownItems = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
		$scope.selectedDropdownItems = [];
		// $scope.extraSettings = {externalIdProp: '', displayProp: 'name'};
		$scope.searchbox = '';
		
		$scope.search = function(){
		    console.log('search');
		};

		$scope.init = function(){

		};
	});