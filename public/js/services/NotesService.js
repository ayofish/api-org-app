(function() {
    "use sctrict";

    /**
     * @ngdoc service
     * @name yoyotest.NotesService
     * @description
     * # NotesService
     * Factory in the yoyotest application.
     */
    angular.module('yoyotest')
        .factory('NotesService', ["$http", function($http) {
            // Service logic
            // service url
            var serviceUrl = "/api/notes";
            /**
             * Object closure containing functions to interact with the notes rest api
             * @type {Object|JSON}
             */
            var NotesApi = {
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

            // return the api
            return NotesApi;
        }]);

})();
