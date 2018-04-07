'use strict';

app.factory('UsersService', function ($http, CONFIG) {
    return {
        getUsers: function () {
            return $http.get(CONFIG.API_URL + '/users')
                .then(function (result) {
                    return result.data;
                });
        }
    };
});
