(function () {
    'use strict';

    planEventCtrls.controller('EventCtrl',
        ['$scope', 'EventsService', 'UtilityService',
        function ($scope, EventsService, UtilityService) {
            $scope.evtName = '';
            $scope.loginErrorText = '';
            $scope.Save = function () {
                if (UtilityService.StringIsEmpty($scope.evtName)) {
                    $scope.loginErrorText = 'Name is required';
                }
                else {
                    EventsService.AddEvent({
                        "name": $scope.evtName,
                        "startDate": "2016/07/07",
                        "price": "1123",
                        "owner": 1001,
                        "rate": 3
                    });
                    EventsService.SaveEvents();
                    $scope.LocateTo('/home');
                }
            }
        }]);

})();