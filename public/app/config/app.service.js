/* global angular */

(function() {
    angular.module('mainService', []).factory('$itbook', function($resource) {
//       return $resource('http://localhost:5000/homs.json');
        return $resource('http://10.203.25.253:8080/ITBook/Procesos');
//        return $resource('http://localhost:8080/ITBook/Procesos');
    });
})();