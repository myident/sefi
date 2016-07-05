/* global angular */

(function() {
    angular.module('mAreas').factory('$cvnombres', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/cvnombres/');
    });
})();