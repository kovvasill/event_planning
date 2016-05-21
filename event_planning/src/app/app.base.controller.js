(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('BaseCtrl',
            ['$scope', 'UtilityService', 'EventsService', 'UsersService',
            function ($scope, UtilityService, EventsService, UsersService) {
                $scope.LocateTo = UtilityService.LocateTo;
                $scope.GetEvents = EventsService.GetEvents;
                $scope.IsUserLoggedIn = UsersService.IsUserLoggedIn;
                $scope.GetUserFullName = UsersService.GetUserFullName;
            }]);

})();

