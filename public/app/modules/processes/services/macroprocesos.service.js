/* global angular */

(function() {
    angular.module('Macroprocesos', []).factory('$macroprocesos', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/Macroprocesos/:idmegaproceso', {
            idmegaproceso: '@idmegaproceso'
        });
    });
})();