(function () {
    'use strict';

    angular.module('app.cities')
        .component('cities', {
            templateUrl: 'src/app/components/cities/cities.template.html',
            controller:
                function (CitiesService) {
                    var $ctrl = this;
                    $ctrl.Cities = CitiesService.query();
                },
            $routeConfig: [
                { path: '/', name: 'Cities', component: 'cities', useAsDefault: true }
            ]
        });

})();