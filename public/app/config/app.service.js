/* global angular */

(function() {
    angular.module('mainService', []).factory('$itbook', function($resource, $singleton) {
        var path = $singleton.path;
       return $resource('http://localhost:5000/homs.json');
//        return $resource(path + '/ITBook/Procesos');
//        return $resource('http://localhost:8080/ITBook/Procesos');
    });
})();