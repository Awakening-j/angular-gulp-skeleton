'use strict';

angular.module('app').config(
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        //////////////////////////
        // State Configurations //
        //////////////////////////
        // Use $stateProvider to configure your states.
        $stateProvider.state("main", {
            abstract: true,
            url: "/main",
            controller: 'MainCtrl',
            templateUrl: 'app/main/main.html'
        }).state("secure", {
            abstract: true,
            url: "/secure",
            templateUrl: 'app/main/main.html'
        });
        /////////////////////////////
        // Redirects and Otherwise //
        /////////////////////////////
        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider
        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/main/dashboard');
    }
);