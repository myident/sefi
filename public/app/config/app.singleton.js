/* global angular */

(function() {
    angular.module('Singleton', []).factory('$singleton', function() {
        return {
            path: 'http://10.103.12.40:9000/ITBook/'
        };
    });
})();