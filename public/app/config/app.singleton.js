/* global angular */

(function() {
    angular.module('Singleton', []).factory('$singleton', function() {
        return {
            path: 'http://10.203.24.247:8080'  
        };
    });
})();