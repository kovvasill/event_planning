(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('HomeCtrl',
            ['$scope', 
            function ($scope) {
                $scope.IsEventsFiltering = function () {
                    //return SharedServiceSendIndicator.IsEventsFiltering();
                }
            }]);

})();