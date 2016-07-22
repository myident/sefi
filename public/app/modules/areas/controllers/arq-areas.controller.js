/*global angular*/

(function () {
    var Controller = function($scope, $window, $rootScope) {
        $rootScope.spin = false;
        $scope.go = function(index) {
            $window.location = '#/areas/arquitectura/gobierno/'+index;  
        };
        
        $scope.areas = [
            {
                nombre: 'Business Architecture',
                imagen: 'assets/img/ARQ_NEGOCIO.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Application & Data Architecture',
                imagen: 'assets/img/ARQ_DE_APPS.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Technology Architecture',
                imagen: 'assets/img/ARQ_TECNOLOGIA.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Big Data & Data Science',
                imagen: 'assets/img/ANALISIS_ESTRATEGICO.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'IT Governance',
                imagen: 'assets/img/GOVERNANCE.png',
                descripcion: '',
                subdirector: {
                    nombre: '',
                    puesto: '',
                    trayectoria: ''
                }
            },
            {
                nombre: 'Digital Experience',
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
    Controller.$inject = ['$scope', '$window', '$rootScope'];
    angular.module('mAreas').controller('ArqAreasController', Controller);
})();