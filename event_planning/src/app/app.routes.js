(function () {
    'use strict';

    angular.module('evtOrgApp').
        config(
            ['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/login', {
                        templateUrl: 'src/app/components/login/loginView.html',
                        controller: 'LoginCtrl'
                    }).
                    when('/home', {
                        templateUrl: 'src/app/components/home/homeView.html',
                        controller: 'HomeCtrl'
                    }).
                    when('/about', {
                        templateUrl: 'src/app/components/about/aboutView.html',
                        controller: 'AboutCtrl'
                    }).
                    when('/event', {
                        templateUrl: 'src/app/components/event/eventView.html',
                        controller: 'EventCtrl'
                    }).
                    when('/event/:keyID', {
                        templateUrl: 'src/app/components/event/eventView.html',
                        controller: 'EventCtrl'
                    }).
                    when('/cities', {
                        templateUrl: 'src/app/components/cities/citiesView.html',
                        controller: 'CitiesCtrl'
                    }).
                    otherwise({
                        redirectTo: '/home'
                    });
            }]);

    angular.module('evtOrgApp').
        run(
            ['$rootScope', 'EventsService', 'UsersService',
            function ($rootScope, EventsService, UsersService) {

                $rootScope.$on(
                    "$routeChangeStart",
                    function (event, next, current) {
                        if (!$rootScope.routeRedirected) {
                            $rootScope.routeRedirected = true;
                            EventsService.InitEvents().then(function () { }, function (errorData) { });
                            UsersService.InitUsers().then(function () { }, function (errorData) { });
                        }
                    });
            }]);

})();