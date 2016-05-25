(function () {
    'use strict';

    angular.module('app').
        factory('UtilityService',
            function () {
                function AddPrefixEvPl(name) {
                    return 'ev_pl_' + name;
                }
                function GetLocalStorage(name) {
                    return localStorage.getItem(AddPrefixEvPl(name));
                }
                function SetLocalStorage(name, value) {
                    return localStorage.setItem(AddPrefixEvPl(name), value);
                }

                function StringIsEmpty(str) {
                    // for checking if a string is blank, null, undefined or contains only white-space
                    return (!str || /^\s*$/.test(str) || str.length === 0 || !str.trim());
                }

                var ObjIsEmpty = function (obj) {
                    return (Object.keys(obj).length === 0); // returns 0 if empty or an integer > 0 if non-empty
                }

                var GetTextWidth = function (text, font, minWidth, maxWidth) {
                    // if given, use cached canvas for better performance
                    // else, create new canvas
                    var canvas = GetTextWidth.canvas || (GetTextWidth.canvas = document.createElement("canvas"));
                    var context = canvas.getContext("2d");
                    context.font = font;
                    var metrics = context.measureText(text);

                    var calcWidth = metrics.width + IE_TXT_EXTRA_SPACE;
                    if (calcWidth < minWidth) {
                        calcWidth = minWidth;
                    }
                    else if (calcWidth > maxWidth) {
                        calcWidth = maxWidth;
                    }
                    return calcWidth;
                };

                var GetFormatedDateTime = function (dtStr) {
                    if (dtStr != '') {
                        var dt = new Date(dtStr);

                        var yyyy = dt.getUTCFullYear().toString();
                        var mm = (dt.getUTCMonth() + 1).toString(); // getMonth() is zero-based
                        var dd = dt.getUTCDate().toString();
                        var actionDate = (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + yyyy;

                        var hh = dt.getUTCHours().toString();
                        mm = dt.getUTCMinutes().toString();
                        var actionTime = (hh[1] ? hh : "0" + hh[0]) + ':' + (mm[1] ? mm : "0" + mm[0]);

                        return actionDate + ' ' + actionTime;
                    }
                    else {
                        return '';
                    }
                }

                return {
                    GetLocalStorage: GetLocalStorage,
                    SetLocalStorage: SetLocalStorage,
                    StringIsEmpty: StringIsEmpty,
                    ObjIsEmpty: ObjIsEmpty,
                    GetTextWidth: GetTextWidth,
                    GetFormatedDateTime: GetFormatedDateTime
                };
            });

})();