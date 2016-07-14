/* global angular */

(function() {
    angular.module('Singleton', []).factory('$singleton', function() {
        return {
            path: 'http://10.203.25.37:7001/ITBook/'
           // path: 'http://localhost:8080'
        };
    });
})();