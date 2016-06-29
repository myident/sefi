/* global angular */

(function() {
    angular.module('mainService', []).factory('$itbook', function($resource) {
//        return $resource('http://localhost:5000/muestra.json');
        return $resource('http://10.203.24.247:8080/ITBook/Procesos');
//        return $resource('http://localhost:8080/ITBook/Procesos');
    });
})();