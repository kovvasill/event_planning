(function () {
    'use strict';

    angular.module('app.events')
        .component('eventDetail', {
            templateUrl: 'src/app/components/events/eventDetail/eventDetail.template.html',
            bindings: { $router: '<' },
            controller: EventDetailController
        })

    EventDetailController.$inject = ['EventsService', 'UtilityService', 'UsersService'];
    function EventDetailController(EventsService, UtilityService, UsersService) {
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
        $ctrl.countInvitedUsers = 0;

        UsersService.initUsers();

        var id;
        this.$routerOnActivate = function (next) {
            id = next.params.id;
            if (id > 0) {
                var evt = EventsService.getEventByKeyID(id);
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

        $ctrl.save = function () {
            if (UtilityService.stringIsEmpty($ctrl.evtName)) {
                $ctrl.errorText = 'Name is required';
            }
            else if (new Date($ctrl.evtDate) <= new Date) {
                $ctrl.errorText = 'Please set date in future';
            }
            else if (id > 0) {
                var evt = EventsService.getEventByKeyID(id);
                evt.name = $ctrl.evtName;
                evt.date = $ctrl.evtDate;
                evt.description = $ctrl.evtDescription;
                evt.price = $ctrl.evtPrice;
                EventsService.saveEvents();
                this.$router.navigate(['EventList']);
            }
            else {
                EventsService.addEvent({
                    "name": $ctrl.evtName,
                    "date": $ctrl.evtDate,
                    "description": $ctrl.evtDescription,
                    "price": $ctrl.evtPrice,
                    "owner": 1001,
                    "rate": 3
                });
                EventsService.saveEvents();
                this.$router.navigate(['EventList']);
            }
        }

        $ctrl.usrs = null;
        $ctrl.getInvitedUsers = function () {
            if (UtilityService.objIsEmpty($ctrl.usrs)) {
                $ctrl.usrs = UsersService.getUsers();
                if (!UtilityService.objIsEmpty($ctrl.usrs)) {
                    for (var i = 0, len = $ctrl.usrs.length; i < len; i++) {
                        $ctrl.usrs[i].selected = false;
                    }
                }
            }
            return $ctrl.usrs;
        }

        $ctrl.inviteUsers = function () {
            $ctrl.countInvitedUsers = 0;
            if (!UtilityService.objIsEmpty($ctrl.usrs)) {
                for (var i = 0, len = $ctrl.usrs.length; i < len; i++) {
                    if ($ctrl.usrs[i].selected) {
                        $ctrl.countInvitedUsers++;
                    }
                }
            }
        }

        $ctrl.getCountOfInvitedUsers = function () {
            return $ctrl.countInvitedUsers;
        }
    }

})();