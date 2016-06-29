/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $itbook) {
        $rootScope.appName = 'IT Book';
<<<<<<< HEAD
//        $rootScope.spin = true;
=======
        // $rootScope.spin = true;
>>>>>>> marttin

        $rootScope.elementosMenu = [
            {
                title: 'General Vision',
                link: '',
                subElements: [],
                active: false
            },
            {
                title: 'Our Areas',
                link: '',
                subElements: [
                    {
                        title: 'SR&M',
                        link: '',
                        imgClass: 'srm',
                        active: false
                    },
                    {
                        title: 'Architecture',
                        link: 'areas/arquitectura',
                        imgClass: 'arquitectura',
                        active: false
                    },
                    {
                        title: 'Operations',
                        link: '',
                        imgClass: 'operaciones',
                        active: false
                    },
                    {
                        title: 'Security',
                        link: '',
                        imgClass: 'seguridad',
                        active: false
                    },
                    {
                        title: 'Development',
                        link: '',
                        imgClass: 'desarrollo',
                        active: false
                    },
                    {
                        title: 'IT Processes',
                        link: '',
                        imgClass: 'procesos-it',
                        active: false
                    }
                ],
                active: false
            },
            {
                title: 'Business Architecture',
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