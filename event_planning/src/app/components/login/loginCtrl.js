(function () {
    'use strict';

    angular.module('evtOrgCtrls').
        controller('LoginCtrl',
            ['$scope', 'UtilityService', 'UsersService', 'logedInUser',
            function ($scope, UtilityService, UsersService, logedInUser) {
                $scope.errorText = '';
                $scope.userID = '';
                $scope.password = '';
                $scope.logedInUser = logedInUser;

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

                $scope.LogOutUser = function () {
                    UsersService.LogOutUser();
                }
            }]);

})();