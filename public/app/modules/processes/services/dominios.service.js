/* global angular */

(function() {
    angular.module('Dominios', []).factory('$dominios', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/Dominios');
    });
})();