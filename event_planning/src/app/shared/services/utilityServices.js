(function () {
    'use strict';

    angular.module('app').
        factory('UtilityService',
            function () {
                return {
                    getLocalStorage: getLocalStorage,
                    setLocalStorage: setLocalStorage,
                    stringIsEmpty: stringIsEmpty,
                    objIsEmpty: objIsEmpty
                };

                function addPrefixEvPl(name) {
                    return 'ev_pl_' + name;
                }
                function getLocalStorage(name) {
                    return localStorage.getItem(addPrefixEvPl(name));
                }
                function setLocalStorage(name, value) {
                    return localStorage.setItem(addPrefixEvPl(name), value);
                }

                function stringIsEmpty(str) {
                    // for checking if a string is blank, null, undefined or contains only white-space
                    return (!str || /^\s*$/.test(str) || str.length === 0 || !str.trim());
                }

                var objIsEmpty = function (obj) {
                    return (!obj) || (Object.keys(obj).length === 0); // returns 0 if empty or an integer > 0 if non-empty
                }
            });

})();