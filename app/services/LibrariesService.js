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
        }
    };
});
