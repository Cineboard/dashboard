'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('Cineboard', [
  'ngRoute',
  'data-table',
  'Cineboard.view1',
  'Cineboard.view2',
  'Cineboard.categories',
  'Cineboard.libraries',
  'Cineboard.users',
  'Cineboard.version'
]).

  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/users' });
  }]);
