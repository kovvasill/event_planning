(function () {
    'use strict';

    planEventApp.factory('EventsService',
        ['$q', '$http', '$rootScope', 'UtilityService',
        function ($q, $http, $rootScope, UtilityService) {
            var eventsObj = {};

            var GetEvents = function () {
                return eventsObj.events;
            };

            var SetEvents = function (newEventsObj) {
                eventsObj = newEventsObj;
            }

            var AddEvent = function (newEvent) {
                eventsObj.events.push(newEvent);
            }

            var SaveEvents = function () {
                UtilityService.SetLocalStorage('EVENTS', angular.toJson(eventsObj));
            };

            var InitEvents = function () {
                var defer = $q.defer();
                if (!$rootScope.eventsWasInit) {
                    var storedEvents = angular.fromJson(UtilityService.GetLocalStorage('EVENTS'));
                    if (storedEvents != null) {
                        eventsObj = storedEvents;
                        $rootScope.eventsWasInit = true;
                        defer.resolve('done');
                    }
                    else {
                        $http.get('src/assets/data/defaultEvents.json').
                            success(function (data) {
                                SetEvents(data);
                                $rootScope.eventsWasInit = true;
                                defer.resolve('done');
                            }).
                            error(function (errorData) {
                                defer.reject(errorData);
                            });
                    }
                }
                else {
                    defer.resolve('done');
                }
                return defer.promise;
            }

            return {
                GetEvents: GetEvents,
                AddEvent: AddEvent,
                SaveEvents: SaveEvents,
                InitEvents: InitEvents
            };
        }]);

})();