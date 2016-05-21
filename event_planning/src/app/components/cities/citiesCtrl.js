(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('CitiesCtrl',
            ['$scope', 'CitiesService',
            function ($scope, CitiesService) {
                $scope.Cities = CitiesService.query();
            }]);

})();