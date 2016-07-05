/* global angular */

(function() {
    angular.module('mAreas').factory('$cvs', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + '/ITBook/cvs/:idpersonal', {
            idpersonal: '@idpersonal'
        });
    });
})();