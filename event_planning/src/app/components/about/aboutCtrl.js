(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('AboutCtrl',
            ['$scope', 
            function ($scope) {
                $scope.GetYear = function () {
                    var d = new Date();
                    return d.getFullYear();
                };
            }]);
})();