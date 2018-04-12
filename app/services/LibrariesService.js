'use strict';

app.factory('LibrariesService', function ($rootScope, $http, CONFIG, $location) {
    return {

        getLibraries: function () {
            return $http
                .get(
                    CONFIG.API_URL + '/users/' + $rootScope.currentUser.id + '/libraries')
                .then(function (result) {
                    return result.data.libraries;
                });
        },

        saveLibrary: function (library) {
            return $http
                .post(
                    CONFIG.API_URL + '/libraries',
                    {
                        'user_id': $rootScope.currentUser.id,
                        'title': library.title,
                        'director': library.director,
                        'viewed': library.viewed,
                        'rating': library.rating,
                        'url': library.url,
                        'tags': library.tags,
                        'notes': library.notes
                    });
        },

        deleteLibrary: function (libraryId, title) {
            return $http
                .put(
                    CONFIG.API_URL + '/libraries/' + libraryId,
                    {
                        "id": libraryId,
                        "title": title,
                        "deleted_at": Math.round(new Date().getTime() / 1000)
                    }
                );
        },

        undeleteLibrary: function (libraryId, title) {
            return $http
                .put(
                    CONFIG.API_URL + '/libraries/' + libraryId,
                    {
                        "id": libraryId,
                        "title": title,
                        "deleted_at": null
                    }
                );
        },

        loadLibrary: function (id) {
            return $http
                .get(
                    CONFIG.API_URL + '/libraries/' + id)
                .then(function (result) {
                    return result.data;
                });
        }
    };
});
