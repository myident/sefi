/*global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $routeParams, $itbook, $arquitecturas, $window) {
        
        $rootScope.spin = false;
        
        $scope.back = function(){
            $window.history.back();
        };

        if (!$rootScope.source.rutas) {
            
            $rootScope.source = $arquitecturas.get(function(data) {
                
                console.log(data);
                
                $rootScope.spin = false;
                $rootScope.source.rutas = [0, 0, 0];
                var dominio = $routeParams.procesos || $rootScope.source.rutas[0];

                $scope.dominioActual = $rootScope.source.arquitectura[dominio];

                $scope.dominios = [];

                if ($scope.dominioActual.dominios && $scope.dominioActual.dominios.length) {
                    $scope.dominios = $scope.dominioActual.dominios;
                } else {
                    $scope.dominios = [];
                }

                // Si hay una arquitectura seleccionada en la URL
                if ($routeParams.procesos) {
                    $rootScope.source.rutas[0] = $routeParams.procesos;
                    $rootScope.source.arquitectura[$routeParams.procesos].flipped = true;
                }

                // Cuando voltean una tarjeta y le dan click a algun dominio
                $scope.getCardFlipped = function (value) {
                    $rootScope.source.rutas[0] = value;
                };
            });
            
            
//            $rootScope.source = $itbook.get(function () {
//                $rootScope.spin = false;
//                var dominio = $routeParams.procesos || $rootScope.source.rutas[0];
//
//                $scope.dominioActual = $rootScope.source.arquitectura[dominio];
//
//                $scope.dominios = [];
//
//                if ($scope.dominioActual.dominios && $scope.dominioActual.dominios.length) {
//                    $scope.dominios = $scope.dominioActual.dominios;
//                } else {
//                    $scope.dominios = [];
//                }
//
//                // Si hay una arquitectura seleccionada en la URL
//                if ($routeParams.procesos) {
//                    $rootScope.source.rutas[0] = $routeParams.procesos;
//                    $rootScope.source.arquitectura[$routeParams.procesos].flipped = true;
//                }
//
//                // Cuando voltean una tarjeta y le dan click a algun dominio
//                $scope.getCardFlipped = function (value) {
//                    $rootScope.source.rutas[0] = value;
//                };
//            }, function(err) {
//                console.log(err.status);
//            });

        } else {
            var dominio = $routeParams.procesos || $rootScope.source.rutas[0];

            $scope.dominioActual = $rootScope.source.arquitectura[dominio];

            $scope.dominios = [];

            if ($scope.dominioActual.dominios && $scope.dominioActual.dominios.length) {
                $scope.dominios = $scope.dominioActual.dominios;
            } else {
                $scope.dominios = [];
            }

            // Si hay una arquitectura seleccionada en la URL
            if ($routeParams.procesos) {
                $rootScope.source.rutas[0] = $routeParams.procesos;
                $rootScope.source.arquitectura[$routeParams.procesos].flipped = true;
            }

            // Cuando voltean una tarjeta y le dan click a algun dominio
            $scope.getCardFlipped = function (value) {
                $rootScope.source.rutas[0] = value;
            };
        }



    };

    Controller.$inject = ['$scope', '$rootScope', '$routeParams', '$itbook', '$arquitecturas', '$window'];

    angular
        .module('mProcesses')
        .controller('ProcessesController', Controller);
})();