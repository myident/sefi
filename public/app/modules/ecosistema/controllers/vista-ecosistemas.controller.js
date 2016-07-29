/*global angular*/
(function () {
    var Controller = function ($rootScope, $scope, $location, $itbook, $vash, $arquitecturaseco, $window) {
        
        $rootScope.spin = false;
        
        $scope.goProcesos = function () {
            $window.history.back();
        };

        $scope.ecosistema = $arquitecturaseco.get(function () {
            $scope.dominios = $scope.ecosistema.arquitectura[0].dominios;
        });

        $scope.link = function (i1, i2, i3, i4) {
            $vash.ecosistema = true;
            $window.location = '#/procesos/' + i1 + '/detalle/' + i2 + '/mega/' + i3 + '/macro/' + i4;
        };
    };

    Controller.$inject = ['$rootScope', '$scope', '$location', '$itbook', '$vash','$arquitecturaseco', '$window'];

    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();