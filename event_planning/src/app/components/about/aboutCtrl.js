(function () {
    'use strict';

    planEventCtrls.controller('AboutCtrl',
        ['$scope', 
        function ($scope) {
            $scope.versionNumber = '1';
            $scope.versionBuild = '1';
            $scope.GetYear = function () {
                var d = new Date();
                return d.getFullYear();
            };
        }]);

})();