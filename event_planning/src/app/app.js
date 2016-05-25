(function () {
    'use strict';

    angular.module('app', ['ngComponentRouter', 'ngResource', 'app.main'])
    /*.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    })*/
    .value('$routerRootComponent', 'appMain')

})();
