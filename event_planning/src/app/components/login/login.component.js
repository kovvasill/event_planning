(function () {
    'use strict';

    angular.module('app.login')
        .component('login', {
            templateUrl: 'src/app/components/login/login.template.html',
            bindings: { $router: '<' },
            controller: LoginController,
            $routeConfig: [
                { path: '/', name: 'Login', component: 'login', useAsDefault: true }
            ]
        })

    LoginController.$inject = ['UtilityService', 'UsersService', 'logedInUser'];
    function LoginController(UtilityService, UsersService, logedInUser) {
        var $ctrl = this;
        UsersService.initUsers().then(function () { }, function (errorData) { });
        $ctrl.errorText = '';
        $ctrl.userID = '';
        $ctrl.password = '';
        $ctrl.logedInUser = logedInUser;    

        $ctrl.logInUser = function () {
            if (UtilityService.stringIsEmpty($ctrl.userID)) {
                $ctrl.errorText = 'User ID is required';
            }
            else {
                if (UsersService.logInUser($ctrl.userID, $ctrl.password)) {
                    // TODO: ??? how to implement it
                    //this.$router.navigate(['EventList']); 
                }
                else {
                    $ctrl.errorText = 'User ID or password is incorrect';
                }
            }
        }

        $ctrl.logOutUser = function () {
            UsersService.logOutUser();
        }
    }

})();