(function () {
    angular.module('mAbc').factory('Aplicacion', function ($resource, $singleton) {
        return $resource($singleton.path + 'Dominio/:id');
    });
})();