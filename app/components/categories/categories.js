'use strict';

angular.module('Cineboard.categories', ['ngRoute'])

    .config(function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'components/categories/categories.html',
            controller: 'CategoriesController'
        });
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/new-category', {
            templateUrl: 'components/categories/new-category.html',
            controller: 'CategoriesController'
        });
    })

    .controller('CategoriesController', function ($rootScope, $scope, CategoriesService, $location) {
        /**
         * Categories default empty state
         */
        if (!$rootScope.currentUser) {
            $location.path('/');
            return false;
        }

        $scope.categoriesData = [];

        /**
         * dTable config options
         */
        $scope.options = {
            rowHeight: 100,
            footerHeight: false,
            scrollbarV: false,
            columnMode: 'force',
            headerHeight: 50,
            columns: [

                {
                    name: "Category",
                    prop: "name",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Created at",
                    prop: "created_at",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Updated at",
                    prop: "updated_at",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Deleted at",
                    prop: "deleted_at",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span> - </span>';
                        }
                    }
                },
                {
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<button class="btn-inline"><i class="fa fa-undo" ng-click="doUndo($row)"></i></button>';
                        } else {
                            return '<button class="btn-inline"><i class="fa fa-trash" ng-click="doDelete($row)"></i></button>';
                        }
                    }
                }
            ]
        };

        $scope.onRowClick = function (row) {
            console.log('ROW CLICKED', row);
        };

        $scope.doUndo = function (row) {
            console.log('UNDO CLICKED', row.id, row.name);

            CategoriesService
                .undeleteCategory(row.id, row.name)
                .then(
                    function (response) {
                        console.log('undelete response', response);

                        CategoriesService
                            .getCategories()
                            .then(function (categoriesData) {
                                $scope.categoriesData = categoriesData.sort(
                                    function compareObject(objA, objB) {
                                        if (objA.name < objB.name) {
                                            return -1;
                                        }

                                        if (objA.name > objB.name) {
                                            return 1;
                                        }

                                        return 0;
                                    }
                                );
                                console.log(categoriesData);
                            });
                    }
                )
        }

        $scope.doDelete = function (row) {
            console.log('DELETE CLICKED', row.id, row.name);
            CategoriesService
                .deleteCategory(row.id, row.name)
                .then(
                    function (response) {
                        console.log('delete response', response);

                        CategoriesService
                            .getCategories()
                            .then(function (categoriesData) {
                                $scope.categoriesData = categoriesData.sort(
                                    function compareObject(objA, objB) {
                                        if (objA.name < objB.name) {
                                            return -1;
                                        }

                                        if (objA.name > objB.name) {
                                            return 1;
                                        }

                                        return 0;
                                    }
                                );
                                console.log(categoriesData);
                            });
                    }
                );
        };

        CategoriesService
            .getCategories()
            .then(function (categoriesData) {
                $scope.categoriesData = categoriesData.sort(
                    function compareObject(objA, objB) {
                        if (objA.name < objB.name) {
                            return -1;
                        }

                        if (objA.name > objB.name) {
                            return 1;
                        }

                        return 0;
                    }
                );
                console.log(categoriesData);
            });

            $scope.saveCategory = function (category) {
                if (typeof category.name !== 'undefined') {
                    CategoriesService
                        .saveCategory(category)
                        .then(function (categoriesData) {
                            $location.path('/categories');
                        });
                }
            };
        });
