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
])

  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/users' });
  })

  .factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
    // Active request count
    var requestCount = 0;
    $rootScope.isLoading = false;

    function startRequest(config) {
      console.log('startRequest, isLoading: ', $rootScope.isLoading);
      $rootScope.isLoading = true;

      // If no request ongoing, then broadcast start event
      if (!requestCount) {
        $rootScope.$broadcast('httpLoaderStart');
      }

      requestCount++;
      return config;
    }

    function endRequest(arg) {
      console.log('endRequest, isLoading: ', $rootScope.isLoading);
      $rootScope.isLoading = false;

      // No request ongoing, so make sure we don’t go to negative count
      if (!requestCount)
        return;

      requestCount--;
      // If it was last ongoing request, broadcast event
      if (!requestCount) {
        $rootScope.$broadcast('httpLoaderEnd');
      }

      return arg;
    }

    // Return interceptor configuration object
    return {
      'request': startRequest,
      'requestError': endRequest,
      'response': endRequest,
      'responseError': endRequest
    };
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpLoaderInterceptor');
  }])

  .directive('httpLoader', function () {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        // Store original display mode of element
        var shownType = element.css('display');
        function hideElement() {
          element.css('display', 'none');
        }

        scope.$on('httpLoaderStart', function () {
          element.css('display', shownType);
        });

        scope.$on('httpLoaderEnd', hideElement);

        // Initially hidden
        hideElement();
      }
    };
  });