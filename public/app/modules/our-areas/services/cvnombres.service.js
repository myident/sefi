/* global angular */

(function() {
    angular.module('mArchitecture').factory('$cvnombres', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'cvnombres/');
    });
})();