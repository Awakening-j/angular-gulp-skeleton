'use strict';

angular.module('app')

	.run(function($rootScope, $state, $stateParams, $localStorage, $sessionStorage, AppUtils, IStorage, IAPI) {
		var exportToWindow = function(){
		    window.$rootScope = $rootScope;
	        window.$state = $state;
	        window.$stateParams = $stateParams;
	        window.$localStorage = $localStorage;
	        window.$sessionStorage = $sessionStorage;
	        window.AppUtils = AppUtils;
	        window.IStorage = IStorage;
	        window.IAPI = IAPI;
	        return 'export object to window for develop. [$rootScope, $state, $stateParams, $localStorage, $sessionStorage, AppUtils, IStorage, IAPI].';
		};
		console.log(exportToWindow());
	});