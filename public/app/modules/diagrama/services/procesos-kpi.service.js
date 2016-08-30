/* global angular */

(function() {
    angular.module('serviceProcesos', []).factory('$procesoskpi', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'Procesokpi/:idmacroproceso', {
            idmacroproceso: '@idmacroproceso'
        });
    });
})();