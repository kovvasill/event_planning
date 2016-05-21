(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('EventCtrl',
            ['$scope', '$routeParams', 'EventsService', 'UtilityService',
            function ($scope, $routeParams, EventsService, UtilityService) {
                $scope.errorText = '';
                $scope.evtName = '';
                $scope.evtDate = '';
                $scope.evtDescription = '';
                $scope.evtPrice = 0;

                if ($routeParams.keyID > 0) {
                    var evt = EventsService.GetEventByKeyID($routeParams.keyID);
                    if (evt) {
                        $scope.evtName = evt.name;
                        $scope.evtDate = evt.date;
                        $scope.evtDescription = evt.description;
                        $scope.evtPrice = evt.price;
                    }
                }

                $scope.Save = function () {
                    if (UtilityService.StringIsEmpty($scope.evtName)) {
                        $scope.errorText = 'Name is required';
                    }
                    else {
                        EventsService.AddEvent({
                            "name": $scope.evtName,
                            "date": $scope.evtDate,
                            "description": $scope.evtDescription,
                            "price": $scope.evtPrice,
                            "owner": 1001,
                            "rate": 3
                        });
                        EventsService.SaveEvents();
                        $scope.LocateTo('/home');
                    }
                }
            }]);

})();