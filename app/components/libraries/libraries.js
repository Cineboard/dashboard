'use strict';

angular.module('Cineboard.libraries', ['ngRoute', 'data-table'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'components/libraries/libraries.html',
            controller: 'LibrariesController'
        });
    }])

    .controller('LibrariesController', ['$scope', 'LibrariesService', function ($scope, LibrariesService) {
        $scope.options = {
            rowHeight: 100,
            footerHeight: false,
            scrollbarV: false,
            headerHeight: 50,
            //columnMode: 'flex',
            selectable: true,
            multiSelect: true,
            columns: [{
                name: "UserId",
                prop: "user_id",
                width: 300
            }, {
                name: "Title",
                prop: "title"
            }, {
                name: "Rating",
                prop: "rating"
            }, {
                name: "Tags",
                prop: "tags"
            }, {
                name: "Notes",
                prop: "notes"
            }]
        };
        $scope.selected = [];
        $scope.onSelect = function (row) {
            console.log('ROW SELECTED!', row);
        };
        $scope.onRowClick = function (row) {
            console.log('ROW CLICKED', row);
        };
        LibrariesService.getLibraries().then(function (librariesData) {
            $scope.librariesData = librariesData;
            console.log(librariesData);
        });
    }]);
