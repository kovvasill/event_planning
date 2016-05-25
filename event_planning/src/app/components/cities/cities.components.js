(function () {
    'use strict';

    angular.module('app.cities')
        .component('cities', {
            templateUrl: 'src/app/components/cities/cities.template.html',
            controller: CitiesController,
            $routeConfig: [
                { path: '/', name: 'Cities', component: 'cities', useAsDefault: true }
            ]
        });

    CitiesController.$inject = ['CitiesService'];
    function CitiesController(CitiesService) {
        var $ctrl = this;
        $ctrl.cities = CitiesService.query();
    }

})();