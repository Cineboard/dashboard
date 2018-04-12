'use strict';

angular.module('Cineboard.libraries', ['ngRoute', 'data-table'])

    .config(function ($routeProvider) {
        $routeProvider.when('/libraries', {
            templateUrl: 'components/libraries/libraries.html',
            controller: 'LibrariesController'
        });
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/new-library', {
            templateUrl: 'components/libraries/new-library.html',
            controller: 'LibrariesController'
        });
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/libraries/:id', {
            templateUrl: 'components/libraries/library-detail.html',
            controller: 'LibrariesController'
        });
    })

    .controller('LibrariesController', function ($rootScope, $routeParams,  $scope, LibrariesService, $location) {
        if (!$rootScope.currentUser) {
            $location.path('/');
            return false;
        }

        $scope.id = $routeParams.id;
        $scope.librariesData = [];

        /**
         * dTable config options
         * TODO: tune backend API to softelete (as categories)
         */
        $scope.options = {
            rowHeight: 100,
            footerHeight: false,
            scrollbarV: false,
            columnMode: 'force',
            headerHeight: 50,
            columns: [
                {
                    name: "Title",
                    prop: "title",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Rating",
                    prop: "rating",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Viewed",
                    prop: "viewed",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Tags",
                    prop: "tags",
                    cellRenderer: function (scope) {
                        if (scope.$row.deleted_at !== null) {
                            return '<span class="row-deleted">{{$cell}}</span>';
                        } else {
                            return '<span>{{$cell}}</span>';
                        }
                    }
                },
                {
                    name: "Notes",
                    prop: "notes",
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
            $location.path('/libraries/' + row.id);
        };

        $scope.doUndo = function (row) {
            console.log('UNDO CLICKED', row.id, row.title);

            LibrariesService
                .undeleteLibrary(row.id, row.title)
                .then(
                    function (response) {
                        console.log('undelete response', response);

                        LibrariesService
                            .getLibraries()
                            .then(function (librariesData) {
                                $scope.librariesData = librariesData.sort(
                                    function compareObject(objA, objB) {
                                        if (objA.title < objB.title) {
                                            return -1;
                                        }

                                        if (objA.title > objB.title) {
                                            return 1;
                                        }

                                        return 0;
                                    }
                                );
                                console.log(librariesData);
                            });
                    }
                )
        }

        $scope.doDelete = function (row) {
            console.log('DELETE CLICKED', row.id, row.title);
            LibrariesService
                .deleteLibrary(row.id, row.title)
                .then(
                    function (response) {
                        console.log('delete response', response);

                        LibrariesService
                            .getLibraries()
                            .then(function (librariesData) {
                                $scope.librariesData = librariesData.sort(
                                    function compareObject(objA, objB) {
                                        if (objA.title < objB.title) {
                                            return -1;
                                        }

                                        if (objA.title > objB.title) {
                                            return 1;
                                        }

                                        return 0;
                                    }
                                );
                                console.log(librariesData);
                            });
                    }
                );
        };

        LibrariesService
            .getLibraries()
            .then(function (librariesData) {
                    $scope.librariesData = librariesData.sort(
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
                    console.log(librariesData);
                }
            );

        $scope.saveLibrary = function (library) {
            if (typeof library.title !== 'undefined') {
                LibrariesService
                    .saveLibrary(library)
                    .then(function (librariesData) {
                        $location.path('/libraries');
                    }
                );
            }
        };

        $scope.loadLibrary = function (id) {
            LibrariesService
                .loadLibrary(id)
                .then(function (library) {
                    $scope.library = library;
                }
            );
        };
    });
