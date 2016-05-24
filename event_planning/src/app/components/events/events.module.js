(function () {
    'use strict';
    angular.module('app.events', [])
      .component('events', {
          template: '<ng-outlet></ng-outlet>',
          $routeConfig: [
            { path: '/', name: 'EventList', component: 'eventList', useAsDefault: true },
            { path: '/:id', name: 'EventDetail', component: 'eventDetail' }
          ]
      })

})();
