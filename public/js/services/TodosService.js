(function() {
    "use sctrict";

    /**
     * @ngdoc service
     * @name yoyotest.TodosService
     * @description
     * # TodosService
     * Factory in the yoyotest application.
     */
    angular.module('yoyotest')
        .factory('TodosService', ["$http", function($http) {
            // Service logic
            // service url
            var serviceUrl = "/api/todos";
            /**
             * Object closure containing functions to interact with the todos rest api
             * @type {Object|JSON}
             */
            var TodosApi = {
                create: function(data) {
                    return $http.post(serviceUrl, data);
                },
                remove: function(id) {
                    if (!_.isUndefined(id) && !_.isEmpty(id)) {
                        return $http.delete(serviceUrl + '/' + id);
                    }
                },
                get: function(id) {
                    if (!_.isUndefined(id) && !_.isEmpty(id)) {
                        return $http.get(serviceUrl + '/' + id);
                    } else {
                        return $http.get(serviceUrl);
                    }
                },
                update: function(id, data) {
                    if (!_.isUndefined(id) && !_.isEmpty(id)) {
                        return $http.put(serviceUrl + '/' + id, data);
                    }
                }
            };

            // return the api here
            return TodosApi;
        }]);

})();
