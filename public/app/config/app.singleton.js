/* global angular */

(function() {
    angular.module('Singleton', []).factory('$singleton', function() {
        return {
            path: 'http://10.203.25.21:8080'
           // path: 'http://localhost:8080'
        };
    });
})();