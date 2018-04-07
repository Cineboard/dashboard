'use strict';

app.factory('CategoriesService', function ($http, CONFIG) {
    return {
        getCategories: function () {
            return $http.get(CONFIG.API_URL + '/categories')
                .then(function (result) {
                    return result.data;
                });
        }
    };
});
