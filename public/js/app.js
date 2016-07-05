(function() {
    'use strict';
    angular.module('yoyotest', ['ngResource', 'ngSanitize', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm'
                }).when('/notes', {
                    templateUrl: 'templates/notes.html',
                    controller: 'NotesCtrl',
                    controllerAs: 'vm'
                }).when('/todos', {
                    templateUrl: 'templates/todos.html',
                    controller: 'TodosCtrl',
                    controllerAs: 'vm'
                }).otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
        });
}());
