(function () {
    'use strict';

    angular.module('app').
        factory('CitiesService',
            ['$resource',
            function ($resource) {
                return $resource('http://localhost:36275/api/cities', {}, {
                    query: { method: 'GET', params: {}, isArray: true }
                });
            }]);
})();