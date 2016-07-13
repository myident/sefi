/* global angular */

(function() {
    angular.module('mHome').factory('$home', function($resource, $singleton) {
        var path = $singleton.path;
        return $resource(path + 'Home');
    });
})();