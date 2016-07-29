/* global angular */

(function() {
    angular.module('Megaprocesos', []).factory('$megaprocesos', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'Megaprocesos/:iddominio', {
            iddominio: '@iddominio'
        });
    });
})();