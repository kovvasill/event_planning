angular.module('evtOrgCtrls', []);
angular.module('evtOrgApp', ['ngRoute', 'ngResource', 'evtOrgCtrls']);

(function () {
    'use strict';
    // Fix for platform-specific URL prefixing.
    angular.module('evtOrgApp').
        config(
            ['$compileProvider', 
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
                $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);
            }
        ]);
})();