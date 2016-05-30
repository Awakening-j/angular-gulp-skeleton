'use strict';

angular.module('app', ['ngAnimate', 
						'ngCookies', 
						'ngTouch', 
						'ngSanitize', 
						'ngResource', 
						'ui.router', 
						'ui.bootstrap', 
						'ngStorage',
						'nvd3',
						'ui.grid',
						'ui.grid.selection',
						'ui.grid.resizeColumns',
						'ui.grid.exporter',
						'ui.grid.pagination',
						'angularjs-dropdown-multiselect'
					  ])

	.run(function($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
	});