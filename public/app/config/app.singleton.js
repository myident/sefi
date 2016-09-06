/* global angular */

(function() {
    angular.module('Singleton', []).factory('$singleton', function() {
        return {
            path: 'http://14.128.82.183:14501/ITBook/'
        };
    });
})();