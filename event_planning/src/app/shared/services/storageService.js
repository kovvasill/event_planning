(function () {
    'use strict';

    angular.module('evtOrgApp').
        constant('uniqueKeyIDs', {
            userKeyID: 4,
            eventKeyID: 4
        });

    angular.module('evtOrgApp').
        value('logedInUser', {
            keyID: 0,
            userID: '', 
            password: '',
            firstName: '',
            lastName: '',
            age: 0
        });

    angular.module('evtOrgApp').
        factory('UsersService',
            ['$q', '$http', '$rootScope', 'UtilityService', 'logedInUser', 'uniqueKeyIDs',
            function ($q, $http, $rootScope, UtilityService, logedInUser, uniqueKeyIDs) {
                var usersObj = {};

                var userKeyID = parseInt(UtilityService.GetLocalStorage('USER_UNIQUE_KEY_ID'));
                if (!userKeyID) {
                    userKeyID = uniqueKeyIDs.userKeyID
                }

                var GetUsers = function () {
                    return usersObj.users;
                }

                var SetUsers = function (newUsersObj) {
                    usersObj = newUsersObj;
                }

                var AddUser = function (newUser) {
                    newUser.keyID = userKeyID;
                    userKeyID++;
                    usersObj.users.push(newUser);
                }

                var SaveUsers = function () {
                    UtilityService.SetLocalStorage('USER_UNIQUE_KEY_ID', userKeyID);
                    UtilityService.SetLocalStorage('USERS', angular.toJson(usersObj));
                };

                var InitUsers = function () {
                    var defer = $q.defer();
                    if (!$rootScope.usersWasInit) {
                        var storedUsers = angular.fromJson(UtilityService.GetLocalStorage('USERS'));
                        if (storedUsers != null) {
                            usersObj = storedUsers;
                            $rootScope.usersWasInit = true;
                            defer.resolve('done');
                        }
                        else {
                            $http.get('src/assets/data/defaultUsers.json').
                                success(function (data) {
                                    SetUsers(data);
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

                var LogInUser = function (userID, password) {
                    var result = false;
                    for (var i = 0, len = GetUsers().length; i < len; i++) {
                        if ((GetUsers()[i].userID === userID) && (GetUsers()[i].password === password)) {
                            logedInUser.keyID = GetUsers()[i].keyID;
                            logedInUser.userID = GetUsers()[i].userID;
                            logedInUser.password = GetUsers()[i].password;
                            logedInUser.firstName = GetUsers()[i].firstName;
                            logedInUser.lastName = GetUsers()[i].lastName;
                            logedInUser.age = GetUsers()[i].age;
                            result = true;
                            break;
                        }
                    }
                    return result;
                }

                var LogOutUser = function () {
                    logedInUser.keyID = 0;
                    logedInUser.userID = '';
                    logedInUser.password = '';
                    logedInUser.firstName = '';
                    logedInUser.lastName = '';
                    logedInUser.age = 0;
                }

                var IsUserLoggedIn = function () {
                    return !UtilityService.StringIsEmpty(logedInUser.userID)
                }

                var GetUserFullName = function () {
                    return logedInUser.firstName + ' ' + logedInUser.lastName;
                }

                return {
                    AddUser: AddUser,
                    SaveUsers: SaveUsers,
                    InitUsers: InitUsers,
                    LogInUser: LogInUser,
                    LogOutUser: LogOutUser,
                    IsUserLoggedIn: IsUserLoggedIn,
                    GetUserFullName: GetUserFullName
                };
            }]);

    angular.module('evtOrgApp').
        factory('EventsService',
            ['$q', '$http', '$rootScope', 'UtilityService', 'uniqueKeyIDs',
            function ($q, $http, $rootScope, UtilityService, uniqueKeyIDs) {
                var eventsObj = {};

                var eventKeyID = parseInt(UtilityService.GetLocalStorage('EVENT_UNIQUE_KEY_ID'));
                if (!eventKeyID) {
                    eventKeyID = uniqueKeyIDs.eventKeyID
                }

                var GetEvents = function () {
                    return eventsObj.events;
                };

                var GetEventByKeyID = function (keyID) {
                    var evt = null;
                    for (var i = 0, len = GetEvents().length; i < len; i++) {
                        if (GetEvents()[i].keyID == keyID) {
                            evt = GetEvents()[i];
                            break;
                        }
                    }
                    return evt;
                };

                var SetEvents = function (newEventsObj) {
                    eventsObj = newEventsObj;
                }

                var AddEvent = function (newEvent) {
                    newEvent.keyID = eventKeyID;
                    eventKeyID++;
                    eventsObj.events.push(newEvent);
                }

                var SaveEvents = function () {
                    UtilityService.SetLocalStorage('EVENT_UNIQUE_KEY_ID', eventKeyID);
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
                    GetEventByKeyID: GetEventByKeyID,
                    AddEvent: AddEvent,
                    SaveEvents: SaveEvents,
                    InitEvents: InitEvents
                };
            }]);

})();