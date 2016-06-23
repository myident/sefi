/*global angular*/

(function () {
    var Controller = function($scope, $window) {
        $scope.go = function() {
            $window.location = '#/areas/arquitectura/';  
        };
        
        $scope.content = {
            perfil: {
                nombre: 'Luis Fernando Valdeón',
                puesto: 'Director Ejecutivo | Arquitectura'
            },
            frase: {
                contenido: 'El éxito está conectado con la acción. La gente exitosa se mantiene en movimiento, comete errores pero nunca se da por vencida.',
                autor: 'Conrad Hilton'
            },
            personales: [
                {
                    titulo: 'Perfil personal',
                    imagen: '/',
                    contenido: ''
                },
                {
                    titulo: 'Mayor logro profesional',
                    imagen: '/',
                    contenido: ''
                },
                {
                    titulo: 'Mayor logro personal',
                    imagen: '/',
                    contenido: ''
                }
            ]
        };
    };
    Controller.$inject = ['$scope', '$window'];
    angular.module('mAreas').controller('TrayectoriaController', Controller);
})();