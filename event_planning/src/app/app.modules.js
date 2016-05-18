var planEventCtrls = angular.module('planEventCtrls', []);
var planEventApp = angular.module('planEventApp', ['ngRoute', 'planEventCtrls']);

(function () {
    'use strict';
    // Fix for platform-specific URL prefixing.
    planEventApp.config(
        ['$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);
        }
    ]);
})();