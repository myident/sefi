/* global angular */

(function() {
    angular.module('Procesos', []).factory('$procesos', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/Proceso/:idmacroproceso', {
            idmacroproceso: '@idmacroproceso'
        });
    });
})();