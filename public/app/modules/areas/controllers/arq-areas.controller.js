/*global angular*/

(function () {
    var Controller = function($scope, $window) {
        
        $scope.go = function() {
            $window.location = '#/areas/arquitectura/gobierno';  
        };
        
        $scope.areas = [
            {
                nombre: 'Arquitectura de Negocio',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Arquitectura de Datos y Aplicaciones',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Arquitectura de Tecnología',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Análisis Estratégico',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Gobierno de TI',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Experiencia Digital',
                imagen: '',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
        ];
        
    };
    Controller.$inject = ['$scope', '$window'];
    angular.module('mAreas').controller('ArqAreasController', Controller);
})();