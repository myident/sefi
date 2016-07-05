/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $window, $cvs, $routeParams) {

        $rootScope.spin = true;
        
        $scope.id_cv = $routeParams.id_area || 1;


        $scope.trayectoriaImg = $scope.id_cv == 1 ?  "img-1" : "";

        $cvs.query({
            idpersonal: $scope.id_cv
        }, function (data) {
            $scope.cv = data[0];
            console.log(data);
            $rootScope.spin = false;
        });

        $scope.go = function () {
//            $window.location = '#/areas/arquitectura/';
            $window.history.back();
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
    Controller.$inject = ['$scope', '$rootScope', '$window', '$cvs', '$routeParams'];
    angular.module('mAreas').controller('TrayectoriaController', Controller);
})();