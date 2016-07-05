/*global angular*/

(function () {
    var Controller = function ($scope, $window, $cvs) {

        $cvs.query({
            idpersonal: 1
        }, function (data) {
            $scope.cv = data[0];
            console.log(data);
        });

        $scope.go = function () {
            $window.location = '#/areas/arquitectura/';
        };

        $scope.content = {
            perfil: {
                nombre: 'Luis Fernando Valdeón',
                puesto: 'Enterprise Achitecture Executive Director'
            },
            frase: {
                contenido: '“A goal without a plan is just a wish.”',
                autor: 'Conrad Hilton'
            },
            personales: [
                {
                    titulo: 'Personal profile',
                    imagen: '/assets/img/perfil-personal.png',
                    contenido: 'Technology and business visionary with executive and hands-on experience in multi million dollars projects. Strong record of success in creating robust IT architectures and infrastructure. Proven ability to bring the benefits of IT to solve business issues while managing costs and risks.'
                },
                {
                    titulo: 'Major professional achievement',
                    imagen: '/assets/img/mayor-logro.png',
                    contenido: 'Technology and business visionary with executive and hands-on experience in multi million dollars projects. Strong record of success in creating robust IT architectures and infrastructure. Proven ability to bring the benefits of IT to solve business issues while managing costs and risks.'
                },
                {
                    titulo: 'Major personal achievement',
                    imagen: '/assets/img/mayor-logro-personal.png',
                    contenido: 'Technology and business visionary with executive and hands-on experience in multi million dollars projects. Strong record of success in creating robust IT architectures and infrastructure. Proven ability to bring the benefits of IT to solve business issues while managing costs and risks.'
                }
            ]
        };




    };
    Controller.$inject = ['$scope', '$window', '$cvs'];
    angular.module('mAreas').controller('TrayectoriaController', Controller);
})();