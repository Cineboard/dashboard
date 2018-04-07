'use strict';

angular.module('Cineboard.categories', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'components/categories/categories.html',
            controller: 'CategoriesController'
        });
    }])

    .controller('CategoriesController', ['$scope', 'CategoriesService', function ($scope, CategoriesService) {
        CategoriesService.getCategories().then(function (categoriesData) {
            $scope.categoriesData = categoriesData;
            console.log(categoriesData);
        });
    }]);
