(function () {
    'use strict';

    angular.module('app')
        .component('alertBar', {
            templateUrl: 'src/app/shared/directives/alertBar/alertBarView.html',
            controller: function () {

            },
            bindings: {
                alertMsg: '<'
            }
        });
})();