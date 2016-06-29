/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $itbook) {
        $rootScope.appName = 'IT Book';
        $rootScope.spin = true;

        $rootScope.elementosMenu = [
            {
                title: 'Visión general',
                link: '',
                subElements: [],
                active: false
            },
            {
                title: 'Nuestras áreas',
                link: '',
                subElements: [
                    {
                        title: 'SR&M',
                        link: '',
                        imgClass: 'srm',
                        active: false
                    },
                    {
                        title: 'Arquitectura',
                        link: 'areas/arquitectura',
                        imgClass: 'arquitectura',
                        active: false
                    },
                    {
                        title: 'Desarrollo',
                        link: '',
                        imgClass: 'desarrollo',
                        active: false
                    },
                    {
                        title: 'Operaciones',
                        link: '',
                        imgClass: 'operaciones',
                        active: false
                    },
                    {
                        title: 'Seguridad',
                        link: '',
                        imgClass: 'seguridad',
                        active: false
                    },
                    {
                        title: 'Procesos',
                        link: '',
                        imgClass: 'procesos-it',
                        active: false
                    }
                ],
                active: false
            },
            {
                title: 'Procesos',
                link: 'procesos',
                subElements: [],
                active: false
            }
        ];
        
        $rootScope.source = {};
        

//        $rootScope.source = $itbook.get(function (data) {
//            $rootScope.spin = false;
//            var nudata = JSON.stringify(data);
////            console.log(nudata);
//        });


        $rootScope.n = {
            rutas: [0, 0, 0],
        };
    };
    Controller.$inject = ['$scope', '$rootScope', '$itbook'];
    angular.module('app').controller('AppController', Controller);

})();