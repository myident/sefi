/*global angular*/

(function () {
    var Controller = function($scope, $window) {
        
        $scope.go = function() {
            $window.location = '#/areas/arquitectura/gobierno';  
        };
        
        $scope.areas = [
            {
                nombre: 'Arquitectura de Negocio',
                imagen: 'assets/img/ARQ_NEGOCIO.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Arquitectura de Datos y Aplicaciones',
                imagen: 'assets/img/ARQ_DE_APPS.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Arquitectura de Tecnología',
                imagen: 'assets/img/ARQ_TECNOLOGIA.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Análisis Estratégico',
                imagen: 'assets/img/ANALISIS_ESTRATEGICO.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Gobierno de TI',
                imagen: 'assets/img/GOVERNANCE.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Experiencia Digital',
                imagen: 'assets/img/DIGITAL_EXP.png',
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