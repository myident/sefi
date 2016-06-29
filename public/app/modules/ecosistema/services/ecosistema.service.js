/* global angular */

(function() {
    angular.module('Arquitecturaseco', []).factory('$arquitecturaseco', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/Arquitecturaseco');
    });
})();