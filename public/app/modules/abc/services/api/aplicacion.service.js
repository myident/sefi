(function () {
    angular.module('mAbc').factory('$apiaplicaciones', function ($resource, $singleton) {
        return $resource($singleton.path + 'Aplicaciones/:id');
    });
})();