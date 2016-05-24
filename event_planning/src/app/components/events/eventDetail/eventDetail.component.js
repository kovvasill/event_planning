(function () {
    'use strict';

    angular.module('app.events')
        .component('eventDetail', {
            templateUrl: 'src/app/components/events/eventDetail/eventDetail.template.html',
            bindings: { $router: '<' },
            controller:
            function (EventsService, UtilityService) {
                var $ctrl = this;
                $ctrl.errorText = '';
                $ctrl.evtName = '';
                $ctrl.evtDate = new Date();
                $ctrl.evtDate.setHours($ctrl.evtDate.getHours() + 2);
                $ctrl.evtDate.setSeconds(0);
                $ctrl.evtDate.setMilliseconds(0);
                $ctrl.evtDescription = '';
                $ctrl.evtPrice = 0;
                $ctrl.btnText = 'Save';

                var id;
                this.$routerOnActivate = function (next) {
                    // Get the hero identified by the route parameter
                    id = next.params.id;
                    /*heroService.getHero(id).then(function (hero) {
                        $ctrl.hero = hero;
                    });*/
                    if (id > 0) {
                        var evt = EventsService.GetEventByKeyID(id);
                        if (evt) {
                            $ctrl.evtName = evt.name;
                            $ctrl.evtDate = new Date(evt.date);
                            $ctrl.evtDate.setSeconds(0);
                            $ctrl.evtDate.setMilliseconds(0);
                            $ctrl.evtDescription = evt.description;
                            $ctrl.evtPrice = evt.price;
                            $ctrl.btnText = 'Update';
                        }
                   }
                };

                $ctrl.Save = function () {
                    if (UtilityService.StringIsEmpty($ctrl.evtName)) {
                        $ctrl.errorText = 'Name is required';
                    }
                    else if (new Date($ctrl.evtDate) <= new Date) {
                        $ctrl.errorText = 'Please set date in future';
                    }
                    else if (id > 0) {
                        var evt = EventsService.GetEventByKeyID(id);
                        evt.name = $ctrl.evtName;
                        evt.date = $ctrl.evtDate;
                        evt.description = $ctrl.evtDescription;
                        evt.price = $ctrl.evtPrice;
                        EventsService.SaveEvents();
                        this.$router.navigate(['EventList']);
                    }
                    else {
                        EventsService.AddEvent({
                            "name": $ctrl.evtName,
                            "date": $ctrl.evtDate,
                            "description": $ctrl.evtDescription,
                            "price": $ctrl.evtPrice,
                            "owner": 1001,
                            "rate": 3
                        });
                        EventsService.SaveEvents();
                        this.$router.navigate(['EventList']);
                    }
                }
            }
        })

})();