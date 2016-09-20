/*global angular*/
(function () {
    angular.module('brulesFilter', []).filter('brules', function () {
        return function (str) {
            
            if (!str) {
                return '';
            }

            var value = str.split(' ')[0];


            return (value).trim();
        };
    });
})();