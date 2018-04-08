'use strict';

angular.module('Cineboard.users', ['ngRoute', 'data-table'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'components/users/users.html',
            controller: 'UsersController'
        });
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/new-user', {
            templateUrl: 'components/users/new-user.html',
            controller: 'UsersController'
        });
    }])

    .controller('UsersController', function ($rootScope, $scope, UsersService, $location) {
        $scope.options = {
            rowHeight: 50,
            footerHeight: false,
            scrollbarV: false,
            headerHeight: 50,
            columnMode: 'flex',
            columns: [{
                name: "Name",
                prop: "name",
                width: 200,
            }]
        };
        $scope.onRowClick = function (row) {
            console.log('ROW CLICKED', row);
        };
        UsersService.getUsers().then(function (usersData) {
            $scope.usersData = usersData.splice(0, 10);
            console.log(usersData);
        });
        $scope.setUser = function (user) {
            console.log(user.name);
            $rootScope.currentUser = user;
            $location.path('/libraries');
        };
        $scope.saveUser = function(user){
            if(user.name){
                UsersService.saveUser(user.name).then(function (usersData) {
                    $location.path('/');
                });
            }
        }
    });
