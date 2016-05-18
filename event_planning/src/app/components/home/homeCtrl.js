(function () {
    'use strict';

    planEventCtrls.controller('HomeCtrl',
        ['$scope', 
        function ($scope) {
            $scope.IsEventsFiltering = function () {
                //return SharedServiceSendIndicator.IsEventsFiltering();
            }
        }]);

})();