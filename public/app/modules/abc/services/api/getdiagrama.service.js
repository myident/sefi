/* global angular */
(function () {
    angular
        .module('mAbc')
        .factory('$getdiagrama', function ($resource, $singleton) {
            return $resource($singleton.path + 'Diagrama/:id');
        });
})();