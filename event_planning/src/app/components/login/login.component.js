﻿(function () {
    'use strict';

    angular.module('app.login')
        .component('login', {
            templateUrl: 'src/app/components/login/login.template.html',
            bindings: { $router: '<' },
            controller:
                function (UtilityService, UsersService, logedInUser) {
                    var $ctrl = this;
                    UsersService.InitUsers().then(function () { }, function (errorData) { });
                    $ctrl.errorText = '';
                    $ctrl.userID = '';
                    $ctrl.password = '';
                    $ctrl.logedInUser = logedInUser;    

                    $ctrl.LogInUser = function () {
                        if (UtilityService.StringIsEmpty($ctrl.userID)) {
                            $ctrl.errorText = 'User ID is required';
                        }
                        else {
                            if (UsersService.LogInUser($ctrl.userID, $ctrl.password)) {
                                // TODO: ??? how to implement it
                                //this.$router.navigate(['EventList']); 
                            }
                            else {
                                $ctrl.errorText = 'User ID or password is incorrect';
                            }
                        }
                    }

                    $ctrl.LogOutUser = function () {
                        UsersService.LogOutUser();
                    }
                },
            $routeConfig: [
                { path: '/', name: 'Login', component: 'login', useAsDefault: true }
            ]
        })

})();