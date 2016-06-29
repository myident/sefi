/* global angular */

(function() {
    angular.module('Arquitecturas', []).factory('$arquitecturas', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/Arquitecturas');
    });
})();