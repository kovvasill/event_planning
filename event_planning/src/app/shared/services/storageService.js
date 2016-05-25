(function () {
    'use strict';

    angular.module('app').
        constant('uniqueKeyIDs', {
            userKeyID: 4,
            eventKeyID: 4
        });

    angular.module('app').
        value('logedInUser', {
            keyID: 0,
            userID: '', 
            password: '',
            firstName: '',
            lastName: '',
            age: 0
        });

    angular.module('app').
        factory('UsersService',
            ['$q', '$http', '$rootScope', 'UtilityService', 'logedInUser', 'uniqueKeyIDs',
            function ($q, $http, $rootScope, UtilityService, logedInUser, uniqueKeyIDs) {
                var usersObj = {};

                var userKeyID = parseInt(UtilityService.getLocalStorage('USER_UNIQUE_KEY_ID'));
                if (!userKeyID) {
                    userKeyID = uniqueKeyIDs.userKeyID
                }

                var getUsers = function () {
                    return usersObj.users;
                }

                var setUsers = function (newUsersObj) {
                    usersObj = newUsersObj;
                }

                var addUser = function (newUser) {
                    newUser.keyID = userKeyID;
                    userKeyID++;
                    usersObj.users.push(newUser);
                }

                var saveUsers = function () {
                    UtilityService.setLocalStorage('USER_UNIQUE_KEY_ID', userKeyID);
                    UtilityService.setLocalStorage('USERS', angular.toJson(usersObj));
                };

                var initUsers = function () {
                    var defer = $q.defer();
                    if (!$rootScope.usersWasInit) {
                        var storedUsers = angular.fromJson(UtilityService.getLocalStorage('USERS'));
                        if (storedUsers != null) {
                            usersObj = storedUsers;
                            $rootScope.usersWasInit = true;
                            defer.resolve('done');
                        }
                        else {
                            $http.get('src/assets/data/defaultUsers.json').
                                success(function (data) {
                                    setUsers(data);
                                    $rootScope.usersWasInit = true;
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

                var logInUser = function (userID, password) {
                    var result = false;
                    var users = getUsers();
                    if (users) {
                        for (var i = 0, len = users.length; i < len; i++) {
                            if ((users[i].userID === userID) && (users[i].password === password)) {
                                logedInUser.keyID = users[i].keyID;
                                logedInUser.userID = users[i].userID;
                                logedInUser.password = users[i].password;
                                logedInUser.firstName = users[i].firstName;
                                logedInUser.lastName = users[i].lastName;
                                logedInUser.age = users[i].age;
                                result = true;
                                break;
                            }
                        }
                    }
                    return result;
                }

                var logOutUser = function () {
                    logedInUser.keyID = 0;
                    logedInUser.userID = '';
                    logedInUser.password = '';
                    logedInUser.firstName = '';
                    logedInUser.lastName = '';
                    logedInUser.age = 0;
                }

                var isUserLoggedIn = function () {
                    return !UtilityService.stringIsEmpty(logedInUser.userID)
                }

                var getUserFullName = function () {
                    return logedInUser.firstName + ' ' + logedInUser.lastName;
                }

                return {
                    addUser: addUser,
                    saveUsers: saveUsers,
                    initUsers: initUsers,
                    logInUser: logInUser,
                    logOutUser: logOutUser,
                    isUserLoggedIn: isUserLoggedIn,
                    getUserFullName: getUserFullName
                };
            }]);

    angular.module('app').
        factory('EventsService',
            ['$q', '$http', '$rootScope', 'UtilityService', 'uniqueKeyIDs',
            function ($q, $http, $rootScope, UtilityService, uniqueKeyIDs) {
                var eventsObj = {};

                var eventKeyID = parseInt(UtilityService.getLocalStorage('EVENT_UNIQUE_KEY_ID'));
                if (!eventKeyID) {
                    eventKeyID = uniqueKeyIDs.eventKeyID
                }

                var getEvents = function () {
                    return eventsObj.events;
                };

                var getEventByKeyID = function (keyID) {
                    var evt = null;
                    var evts = getEvents();
                    if (evts) {
                        for (var i = 0, len = evts.length; i < len; i++) {
                            if (evts[i].keyID == keyID) {
                                evt = evts[i];
                                break;
                            }
                        }
                    }
                    return evt;
                };

                var setEvents = function (newEventsObj) {
                    eventsObj = newEventsObj;
                }

                var addEvent = function (newEvent) {
                    newEvent.keyID = eventKeyID;
                    eventKeyID++;
                    eventsObj.events.push(newEvent);
                }

                var saveEvents = function () {
                    UtilityService.setLocalStorage('EVENT_UNIQUE_KEY_ID', eventKeyID);
                    UtilityService.setLocalStorage('EVENTS', angular.toJson(eventsObj));
                };

                var initEvents = function () {
                    var defer = $q.defer();
                    if (!$rootScope.eventsWasInit) {
                        var storedEvents = angular.fromJson(UtilityService.getLocalStorage('EVENTS'));
                        if (storedEvents != null) {
                            eventsObj = storedEvents;
                            $rootScope.eventsWasInit = true;
                            defer.resolve('done');
                        }
                        else {
                            $http.get('src/assets/data/defaultEvents.json').
                                success(function (data) {
                                    setEvents(data);
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
                    getEvents: getEvents,
                    getEventByKeyID: getEventByKeyID,
                    addEvent: addEvent,
                    saveEvents: saveEvents,
                    initEvents: initEvents
                };
            }]);

})();