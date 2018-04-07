'use strict';

angular.module('Cineboard.libraries', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'components/libraries/libraries.html',
            controller: 'LibrariesController'
        });
    }])

    .controller('LibrariesController', ['$scope', 'LibrariesService', function ($scope, LibrariesService) {
        LibrariesService.getLibraries().then(function (librariesData) {
            $scope.librariesData = librariesData;
            console.log(librariesData);
        });
    }]);
