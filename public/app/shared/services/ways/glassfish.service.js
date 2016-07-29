/* global angular */

(function() {
    angular.module('Glass', []).factory('$glass', function($resource) {
        return $resource('http://10.203.24.124:7001/testwbs/Home');
    });
})();