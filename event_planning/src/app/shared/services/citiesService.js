(function () {
    'use strict';

    angular.module('evtOrgApp').
        factory('CitiesService',
            ['$resource',
            function ($resource) {
                return $resource('http://localhost:36275/api/cities', {}, {
                    query: { method: 'GET', params: {}, isArray: true }
                });
            }]);
})();