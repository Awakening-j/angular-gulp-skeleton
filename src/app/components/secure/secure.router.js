'use strict';
angular.module('app').config(
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
        .state("secure.login", {
            url: "/login",
            controller: 'LoginCtrl',
            templateUrl: 'app/components/secure/login/login.html'
        }).state("secure.register", {
            url: "/register",
            controller: 'RegisterCtrl',
            templateUrl: 'app/components/secure/register/register.html'
        });
    }
);