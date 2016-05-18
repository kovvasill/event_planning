(function () {
    'use strict';

    planEventCtrls.directive('alertBar',
        ['$compile',
        function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    alertMsg: "@alertMsg"
                },
                templateUrl: 'src/app/shared/directives/alertBar/alertBarView.html'
            };
        }]);
})();