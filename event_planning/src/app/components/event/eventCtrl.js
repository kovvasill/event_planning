(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('EventCtrl',
            ['$scope', '$routeParams', 'EventsService', 'UtilityService',
            function ($scope, $routeParams, EventsService, UtilityService) {
                $scope.errorText = '';
                $scope.evtName = '';
                $scope.evtDate = new Date();
                $scope.evtDate.setHours($scope.evtDate.getHours() + 2);
                $scope.evtDate.setSeconds(0);
                $scope.evtDate.setMilliseconds(0);
                $scope.evtDescription = '';
                $scope.evtPrice = 0;
                $scope.btnText = 'Save';

                if ($routeParams.keyID > 0) {
                    var evt = EventsService.GetEventByKeyID($routeParams.keyID);
                    if (evt) {
                        $scope.evtName = evt.name;
                        $scope.evtDate = new Date(evt.date);
                        $scope.evtDate.setSeconds(0);
                        $scope.evtDate.setMilliseconds(0);
                        $scope.evtDescription = evt.description;
                        $scope.evtPrice = evt.price;
                        $scope.btnText = 'Update';
                    }
                }

                $scope.Save = function () {
                    if (UtilityService.StringIsEmpty($scope.evtName)) {
                        $scope.errorText = 'Name is required';
                    }
                    else if (new Date($scope.evtDate) <= new Date) {
                        $scope.errorText = 'Please set date in future';
                    }
                    else if ($routeParams.keyID > 0) {
                        var evt = EventsService.GetEventByKeyID($routeParams.keyID);
                        evt.name = $scope.evtName;
                        evt.date = $scope.evtDate;
                        evt.description = $scope.evtDescription;
                        evt.price = $scope.evtPrice;
                        EventsService.SaveEvents();
                        $scope.LocateTo('/home');
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