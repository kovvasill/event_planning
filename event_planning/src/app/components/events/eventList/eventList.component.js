(function () {
    'use strict';

    angular.module('app.events')
        .component('eventList', {
            templateUrl: 'src/app/components/events/eventList/eventList.template.html',
            controller: 
                function (EventsService, dateFilter) {
                    var $ctrl = this;
                    EventsService.InitEvents().then(function () {
                    }, function (errorData) { });
                    $ctrl.GetEvents = EventsService.GetEvents;
                    $ctrl.EventClosed = function (evtDate) {
                        var dtNow = dateFilter(new Date(), 'd/M/yyyy h:mm:ss');
                        var dtSch = dateFilter(new Date(evtDate), 'd/M/yyyy h:mm:ss');
                        var ms = moment(dtSch, "DD/MM/YYYY HH:mm:ss").diff(moment(dtNow, "DD/MM/YYYY HH:mm:ss"));
                        return (ms < 0);
                    }

                    $ctrl.IsEventsFiltering = function () {
                        //return SharedServiceSendIndicator.IsEventsFiltering();
                    }
                }
        })          

})();