(function () {
    'use strict';

    angular.module('app.events')
        .component('eventList', {
            templateUrl: 'src/app/components/events/eventList/eventList.template.html',
            controller: EventListController
        })

    EventListController.$inject = ['EventsService', 'dateFilter', 'UsersService'];
    function EventListController(EventsService, dateFilter, UsersService) {
        var $ctrl = this;
        EventsService.initEvents().then(function () { }, function (errorData) { });
        $ctrl.getEvents = EventsService.getEvents;
        $ctrl.eventClosed = function (evtDate) {
            var dtNow = dateFilter(new Date(), 'd/M/yyyy h:mm:ss');
            var dtSch = dateFilter(new Date(evtDate), 'd/M/yyyy h:mm:ss');
            var ms = moment(dtSch, "DD/MM/YYYY HH:mm:ss").diff(moment(dtNow, "DD/MM/YYYY HH:mm:ss"));
            return (ms < 0);
        }
        $ctrl.isUserLoggedIn = UsersService.isUserLoggedIn;
    }

})();