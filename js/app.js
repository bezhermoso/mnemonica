'use strict';


// Declare app level module which depends on filters, and services
angular.module('mnemonica', [
  'ngRoute',
  'mnemonica.filters',
  'mnemonica.services',
  'mnemonica.directives',
  'mnemonica.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/learn/:stack?', {
            templateUrl: 'partials/learn.html',
            controller: 'LearnCtrl'
        });
    $routeProvider.when('/quiz', {
            templateUrl: 'partials/quiz.html',
            controller: 'QuizCtrl'
        });
    $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/learn'});
}]);
