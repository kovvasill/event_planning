(function () {
    'use strict';

    planEventCtrls.controller('MainCtrl',
        ['$scope', 'UtilityService', 'EventsService',
        function ($scope, UtilityService, EventsService) {
            $scope.LocateTo = UtilityService.LocateTo;
            $scope.GetEvents = EventsService.GetEvents;
        }]);

})();

