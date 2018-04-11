'use strict';

app.factory('LibrariesService', function ($rootScope, $http, CONFIG, $location) {
    return {
        getLibraries: function () {
            if (!$rootScope.currentUser) {
                $location.path('/');
                return false;
            }
            return $http.get(CONFIG.API_URL + '/users/' + $rootScope.currentUser.id + '/libraries')
                .then(function (result) {
                    return result.data.libraries;
                });
        },

        saveLibrary: function (library) {
            return $http.post(CONFIG.API_URL + '/libraries', {
                'user_id': $rootScope.currentUser.id,
                'title': library.title,
                'director': library.director,
                'viewed': library.viewed,
                'rating': library.rating,
                'tags': library.tags,
                'url': library.url
            })
                .then(function (result) {
                    return result.data;
                });
        }
    };
});
