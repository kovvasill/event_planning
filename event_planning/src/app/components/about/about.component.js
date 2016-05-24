(function () {
    'use strict';

    angular.module('app.about').
        component('about', {
            templateUrl: 'src/app/components/about/about.template.html',
            controller:
                function () {
                    var $ctrl = this;
                    $ctrl.GetYear = function () {
                        var d = new Date();
                        return d.getFullYear();
                    };
                },
            $routeConfig: [
                  { path: '/', name: 'About', component: 'about', useAsDefault: true }
            ]
        })
})();