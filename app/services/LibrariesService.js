'use strict';

app.factory('LibrariesService', function ($http, CONFIG) {
    return {
        getLibraries: function () {
            return $http.get(CONFIG.API_URL + '/libraries')
                .then(function (result) {
                    return result.data;
                });
        }
    };
});
