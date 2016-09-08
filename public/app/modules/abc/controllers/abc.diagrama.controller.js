/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, Dominio, Megaproceso, Area, Aplicacion, Kpi) {
        
    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', 'Dominio', 'Megaproceso', 'Area', 'Aplicacion', 'Kpi'];
    angular
        .module('mAbc')
        .controller('AbcDiagramaController', Controller);
})();