(function () {
    'use strict';

    planEventApp.config(
        ['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/settings', {
                    templateUrl: 'src/app/components/settings/settingsView.html',
                    controller: 'SettingsCtrl'
                }).
                when('/login', {
                    templateUrl: 'src/app/components/login/loginView.html',
                    controller: 'LoginCtrl'
                }).
                when('/home', {
                    templateUrl: 'src/app/components/home/homeView.html',
                    controller: 'HomeCtrl'
                }).
                when('/about', {
                    templateUrl: 'src/app/components/about/aboutView.html',
                    controller: 'AboutCtrl'
                }).
                when('/event', {
                    templateUrl: 'src/app/components/event/eventView.html',
                    controller: 'EventCtrl'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);

    planEventApp.run(
        ['$rootScope', 'EventsService',/*'SettingsStorageService', 'TranslationService', 'TDOCBaseService', 'SendMediaService', 'HelperService', 'SharedServiceLoginUser', 'SharedServiceConfirmDialog',*/
        function ($rootScope, EventsService/*, SettingsStorageService, TranslationService, TDOCBaseService, SendMediaService, HelperService, SharedServiceLoginUser, SharedServiceConfirmDialog*/) {

            $rootScope.$on(
                "$routeChangeStart",
                function (event, next, current) {
                    // no logged in user
                    if (!$rootScope.routeRedirected) {
                        $rootScope.routeRedirected = true;
                        // restore settings
                        /*if (!$rootScope.settingsRestored) {
                            $rootScope.settingsRestored = true;
                            SettingsStorageService.restoreSettings();
                        }*/

                        EventsService.InitEvents().then(function () {
                            // the first load of app should navigate to "welcome" page
                            /*if (StringIsEmpty(SettingsStorageService.model.serverName)) {
                                HelperService.locateTo('/welcome');
                            }
                            else
                            {
                                var loginFailUrl = '';
                                if (next.templateUrl !== "app/components/login/loginView.html") {
                                    loginFailUrl = '/login';
                                }
                                if ((SettingsStorageService.model.rememberMe) &&
                                    !StringIsEmpty(SettingsStorageService.model.userID))
                                {
                                    var loginError = {};
                                    // make auto login of remembered user and navigate to "home" page
                                    TDOCBaseService.initializeUser(SettingsStorageService.model.userID, SettingsStorageService.model.password, '/home', false, loginError).then(
                                        function () {
                                            // NOTE: we can't call "SendMediaService.processListenFolder()" from "tdocBaseService.js" because of "loop" 
                                            // server was offline and in some point of time it comes back online:
                                            // it's mean that we should check either exists media files in "Listen Folder" to be send to server
                                            SendMediaService.processListenFolder();
                                        },
                                        function () {
                                            if (loginError.loginErrorCode === ERROR_CODE_AUTH) {
                                                HelperService.locateTo('/home');
                                            }
                                            else if (loginFailUrl !== '') {
                                                HelperService.locateTo(loginFailUrl);
                                            }
                                        });
                                }
                                else if (loginFailUrl !== '') {
                                    HelperService.locateTo(loginFailUrl);
                                }
                            }*/
                        },
                        function (errorData) { });
                    }
                });
        }]);

})();