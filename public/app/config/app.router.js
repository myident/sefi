/*global angular*/
(function () {

    var router = function ($routeProvider) {
        var baseUrl = 'app/modules/';
        // Home
        $routeProvider.when('/', {
            templateUrl: baseUrl + 'home/views/home.view.html',
            controller: 'HomeController'
        });
        // Procesos
        $routeProvider.when('/procesos', {
            templateUrl: baseUrl + 'processes/views/processes.view.html',
            controller: 'ProcessesController'
        });
        $routeProvider.when('/procesos/:procesos', {
            templateUrl: baseUrl + 'processes/views/processes.view.html',
            controller: 'ProcessesController'
        });

        // Detalle Procesos
        $routeProvider.when('/procesos/:procesos/detalle/:subprocesos', {
            templateUrl: baseUrl + 'processes/views/processes.detail.view.html',
            controller: 'ProcessesDetailController'
        });
        $routeProvider.when('/procesos/:procesos/detalle/:subprocesos/mega/:mega/macro/:macro', {
            templateUrl: baseUrl + 'processes/views/processes.detail.view.html',
            controller: 'ProcessesDetailController'
        });

        // Vista ecosistemas
        $routeProvider.when('/ecosistema', {
            templateUrl: baseUrl + 'ecosistema/views/vista-ecosistemas.view.html',
            controller: 'VistaEcosistemasController'
        });

        // Arquitectura Trayectoria
        $routeProvider.when('/trayectoria', {
            templateUrl: baseUrl + 'our-areas/views/trayectoria.view.html',
            controller: 'TrayectoriaController'
        });
        $routeProvider.when('/trayectoria/:id_area', {
            templateUrl: baseUrl + 'our-areas/views/trayectoria.view.html',
            controller: 'TrayectoriaController'
        });


        // Admin
        $routeProvider.when('/aplicaciones', {
            templateUrl: baseUrl + 'admin/views/aplicaciones.view.html',
            controller: 'AplicacionesController'
        });


        // Our Areas
        $routeProvider.when('/our-areas/architecture', {
            templateUrl: baseUrl + 'our-areas/views/architecture.view.html',
            controller: 'ArchController'
        });

        // Diagrama
        $routeProvider.when('/diagrama', {
            templateUrl: baseUrl + 'diagrama/views/diagrama.view.html',
            controller: 'DiagramaController'
        });
        
        // Diagrama
        $routeProvider.when('/abc-create', {
            templateUrl: baseUrl + 'abc/views/abc.create.view.html',
            controller: 'AbcCreateController'
        });
        $routeProvider.when('/abc-diagrama', {
            templateUrl: baseUrl + 'abc/views/abc.diagrama.view.html',
            controller: 'AbcDiagramaController'
        });


    };

    router.$inject = ['$routeProvider'];
    angular
        .module('app')
        .config(router);

})();