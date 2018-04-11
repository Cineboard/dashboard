'use strict';

app.factory('CategoriesService', function ($http, CONFIG) {
    return {

        getCategories: function () {
            return $http.get(CONFIG.API_URL + '/categories')
                .then(function (result) {
                    return result.data;
                });
        },

        deleteCategory: function (categoryId, name) {
            return $http
                .put(
                    CONFIG.API_URL + '/categories/' + categoryId,
                    {
                        "id": categoryId,
                        "name": name,
                        "deleted_at": Math.round(new Date().getTime() / 1000)
                    }
                );
        },

        undeleteCategory: function (categoryId, name) {
            return $http
                .put(
                    CONFIG.API_URL + '/categories/' + categoryId,
                    {
                        "id": categoryId,
                        "name": name,
                        "deleted_at": null
                    }
                );
        }
    };
});
