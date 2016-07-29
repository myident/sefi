/* global angular */

(function() {
    angular.module('mAreas').factory('$cvs', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'cvs/:idpersonal', {
            idpersonal: '@idpersonal'
        });
    });
})();