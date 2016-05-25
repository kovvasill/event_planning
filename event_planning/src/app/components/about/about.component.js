(function () {
    'use strict';

    angular.module('app.about').
        component('about', {
            templateUrl: 'src/app/components/about/about.template.html',
            controller: AboutController,
            $routeConfig: [
                { path: '/', name: 'About', component: 'about', useAsDefault: true }
            ]
        })

    function AboutController() {
        var $ctrl = this;
        $ctrl.getYear = function () {
            var d = new Date();
            return d.getFullYear();
        };
    }
})();