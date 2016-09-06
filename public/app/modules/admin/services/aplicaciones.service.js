/* global angular */

(function () {
    angular.module('mAdmin').factory('$aplicaciones', function ($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'Aplicaciones');
    });
})();