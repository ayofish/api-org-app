(function() {
    'use strict';
    angular.module('yoyotest', ['ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl'
                }).when('/todos', {
                    templateUrl: 'templates/todos.html',
                    controller: 'TodosCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });
}());
