(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('LoginCtrl',
            ['$scope', 'UtilityService', 'UsersService',
            function ($scope, UtilityService, UsersService) {
                $scope.errorText = '';
                $scope.userID = '';
                $scope.password = '';

                $scope.LogInUser = function () {
                    if (UtilityService.StringIsEmpty($scope.userID)) {
                        $scope.errorText = 'User ID is required';
                    }
                    else {
                        if (UsersService.LogInUser($scope.userID, $scope.password)) {
                            $scope.LocateTo('/home');
                        }
                        else {
                            $scope.errorText = 'User ID or password is incorrect';
                        }
                    }
                }
            }]);

})();