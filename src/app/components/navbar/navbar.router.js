'use strict';

angular.module('app').config(
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state("main.dashboard", {
            url: "/dashboard",
            controller: 'DashboardCtrl',
            templateUrl: 'app/components/dashboard/dashboard.html'
        })

        .state("main.plugin", {
            url: "/plugin",
            controller: 'PluginCtrl',
            templateUrl: 'app/components/plugin/plugin.html'
        })

        .state("main.about", {
            url: "/about",
            controller: 'AboutCtrl',
            templateUrl: 'app/components/about/about.html'
        });
    }
);