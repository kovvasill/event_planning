(function () {
    'use strict';

    angular.module('app', ['app.main', 'ngComponentRouter', 'ngResource'])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
    }])
    .value('$routerRootComponent', 'appMain');

})();
