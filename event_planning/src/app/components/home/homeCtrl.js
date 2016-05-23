(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('HomeCtrl',
            ['$scope', 'dateFilter', 
            function ($scope, dateFilter) {
                $scope.EventClosed = function (evtDate) {
                    var dtNow = dateFilter(new Date(), 'd/M/yyyy h:mm:ss');
                    var dtSch = dateFilter(new Date(evtDate), 'd/M/yyyy h:mm:ss');
                    var ms = moment(dtSch, "DD/MM/YYYY HH:mm:ss").diff(moment(dtNow, "DD/MM/YYYY HH:mm:ss"));
                    return (ms < 0);
                }

                $scope.IsEventsFiltering = function () {
                    //return SharedServiceSendIndicator.IsEventsFiltering();
                }
            }]);

})();