'use strict';

angular.module('Cineboard.libraries', ['ngRoute', 'data-table'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'components/libraries/libraries.html',
            controller: 'LibrariesController'
        });
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/new-library', {
            templateUrl: 'components/libraries/new-library.html',
            controller: 'LibrariesController'
        });
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/libraries/:id', {
            templateUrl: 'components/libraries/library-detail.html',
            controller: 'LibrariesController'
        });
    }])

    .controller('LibrariesController', function ($rootScope, $routeParams,  $scope, LibrariesService, $location) {
        $scope.id = $routeParams.id;

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
            $location.path('/libraries/' + row.id);
        };

        LibrariesService.getLibraries().then(function (librariesData) {
            $scope.librariesData = librariesData;
            console.log(librariesData);
        });

        $scope.saveLibrary = function (library) {
            if (library.title) {
                LibrariesService.saveLibrary(library).then(function (librariesData) {
                    $location.path('/libraries');
                });
            }
        };

        $scope.loadLibrary = function (id) {
            LibrariesService.loadLibrary(id).then(function (library) {
                $scope.library = library;
            });
        };
    });
