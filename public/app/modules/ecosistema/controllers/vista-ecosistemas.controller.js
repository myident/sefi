/*global angular*/
(function () {
    var Controller = function ($rootScope, $scope, $location, $itbook, $vash, $arquitecturaseco) {
        $scope.goProcesos = function () {
            $location.path('/procesos');
        };

        // $rootScope.source = $itbook.get(function (data) {
        //     $rootScope.source = data;
        //     $scope.dominios = $rootScope.source.arquitectura[0].dominios;
        //     $vash.ecosistema = true;

        // }, function (err) {
        //     console.log(err.status);
        // });

        $scope.ecosistema = $arquitecturaseco.get(function () {
            console.log($scope.ecosistema.arquitectura[0].dominios);
            $scope.dominios = $scope.ecosistema.arquitectura[0].dominios
        });

        $scope.link = function (i1, i2, i3, i4) {
            window.location = '#/procesos/' + i1 + '/detalle/' + i2 + '/mega/' + i3 + '/macro/' + i4;
        };
    };

    Controller.$inject = ['$rootScope', '$scope', '$location', '$itbook', '$vash','$arquitecturaseco'];

    angular
        .module('mEcosistema').controller('VistaEcosistemasController', Controller);
})();