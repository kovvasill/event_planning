(function () {
    'use strict';

    angular.module('app').
        directive('timeToLeft',
            ['$interval', 'dateFilter',
            function ($interval, dateFilter) {
                return {
                    restrict: 'A',
                    templateUrl: 'src/app/shared/directives/timeToLeft/timeToLeftView.html',
                    link: function (scope, element, attrs) {
                        var evtSchDateTime;
                        var stopTime; // so that we can cancel the time updates
                        scope.ttLeft = '';
                        scope.soonEvt = false; // this value using to assign ng-class (red indication): event will be very soon

                        // used to update the UI
                        function updateTime() {
                            if (evtSchDateTime) {
                                var dtNow = dateFilter(new Date(), 'd/M/yyyy h:mm:ss');
                                var dtSch = dateFilter(new Date(evtSchDateTime), 'd/M/yyyy h:mm:ss');
                                var ms = moment(dtSch, "DD/MM/YYYY HH:mm:ss").diff(moment(dtNow, "DD/MM/YYYY HH:mm:ss"));
                                var s = '';
                                if (ms > 0) {
                                    var d = moment.duration(ms);
                                    s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                                    if (d.asHours() <= 4) {
                                        scope.soonEvt = true;
                                    }
                                }
                                scope.ttLeft = s;
                            }
                        }

                        // watch the expression, and update the UI on change.
                        scope.$watch(attrs.timeToLeft, function (value) {
                            evtSchDateTime = value;
                            updateTime();
                        });

                        stopTime = $interval(updateTime, 3000);

                        // listen on DOM destroy (removal) event, and cancel the next UI update
                        // to prevent updating time after the DOM element was removed.
                        element.on('$destroy', function () {
                            $interval.cancel(stopTime);
                        });
                    }
                };
            }]);
})();