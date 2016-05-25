(function () {
    'use strict';

    angular.module('app.main')
        .component('appMain', {
            templateUrl: '/src/app/components/main/main.template.html',
            controller: MainController,
            $routeConfig: [
                { path: '/events/...', name: 'Events', component: 'events', useAsDefault: true },
                { path: '/events/:id', name: 'EventDetail', component: 'eventDetail' },
                { path: '/about/...', name: 'About', component: 'about' },
                { path: '/cities/...', name: 'Cities', component: 'cities' },
                { path: '/login/...', name: 'Login', component: 'login' },
                { path: '/heroes/...', name: 'Heroes', component: 'heroes' }
            ]
        });

    MainController.$inject = ['UsersService'];
    function MainController(UsersService) {
        var $ctrl = this;
        $ctrl.IsUserLoggedIn = UsersService.IsUserLoggedIn;
        $ctrl.GetUserFullName = UsersService.GetUserFullName;
    }

})();