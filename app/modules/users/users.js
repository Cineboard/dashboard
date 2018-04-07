'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'modules/users/users.html',
            controller: 'UsersCtrl'
        });
    }])

    .controller('UsersCtrl', ['$scope', function ($scope) {

    }]);
