/*global angular*/
(function () {
    var Controller = function ($rootScope, $scope, $location, $itbook, $vash, $arquitecturaseco, $window, $indice) {

        $rootScope.spin = false;

        $scope.goProcesos = function () {
            $window.history.back();
        };

        $scope.ecosistema = $arquitecturaseco.get(function () {
            $scope.dominios = $scope.ecosistema.arquitectura[0].dominios;
        });

        $scope.link = function (i1, i2, i3, i4) {
            $indice.$indexArquitectura = i1;
            $indice.$indexDominio = i2;
            $indice.$indexMegaproceso = i3;
            $indice.$indexMacroproceso = i4;
            $vash.ecosistema = true;
            $window.location = '#/diagrama';
        };
    };

    Controller.$inject = ['$rootScope', '$scope', '$location', '$itbook', '$vash', '$arquitecturaseco', '$window', '$indice'];

    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();