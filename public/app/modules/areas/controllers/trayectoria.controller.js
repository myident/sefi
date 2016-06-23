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
                    imagen: '/assets/img/perfil-personal.png',
                    contenido: 'Lorem ipsum dolor sit amet, his in laoreet adipiscing. Natum nemore essent id mel, melius scribentur in sed. Modus suscipit expetenda te vel. Ne aliquam molestiae mea, cum at dolore ponderum convenire, mei lobortis incorrupte ea.'
                },
                {
                    titulo: 'Mayor logro profesional',
                    imagen: '/assets/img/mayor-logro.png',
                    contenido: 'Lorem ipsum dolor sit amet, his in laoreet adipiscing. Natum nemore essent id mel, melius scribentur in sed. Modus suscipit expetenda te vel. Ne aliquam molestiae mea, cum at dolore ponderum convenire, mei lobortis incorrupte ea.'
                },
                {
                    titulo: 'Mayor logro personal',
                    imagen: '/assets/img/mayor-logro-personal.png',
                    contenido: 'Lorem ipsum dolor sit amet, his in laoreet adipiscing. Natum nemore essent id mel, melius scribentur in sed. Modus suscipit expetenda te vel. Ne aliquam molestiae mea, cum at dolore ponderum convenire, mei lobortis incorrupte ea.'
                }
            ]
        };
    };
    Controller.$inject = ['$scope', '$window'];
    angular.module('mAreas').controller('TrayectoriaController', Controller);
})();