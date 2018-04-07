'use strict';

angular.module('Cineboard.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'components/users/users.html',
            controller: 'UsersController'
        });
    }])

    .controller('UsersController', function ($scope, UsersService) {
        UsersService.getUsers().then(function (usersData) {
            $scope.usersData = usersData;
            console.log(usersData);
        });
    });
