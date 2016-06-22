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
    
        // Arquitectura Intro
        $routeProvider.when('/areas/arquitectura', {
            templateUrl: baseUrl + 'areas/views/arquitectura.view.html',
            controller: 'ArquitecturaController'
        });
        
        // Arquitectura Trayectoria
        $routeProvider.when('/areas/arquitectura/trayectoria', {
            templateUrl: baseUrl + 'areas/views/trayectoria.view.html',
            controller: 'TrayectoriaController'
        });
        
        // Arquitectura Areas
        $routeProvider.when('/areas/arquitectura/areas', {
            templateUrl: baseUrl + 'areas/views/arq-areas.view.html',
            controller: 'ArqAreasController'
        });
        
        // Arquitectura Gobierno IT
        $routeProvider.when('/areas/arquitectura/gobierno', {
            templateUrl: baseUrl + 'areas/views/gobierno.view.html',
            controller: 'GobiernoController'
        });
        
        // Arquitectura Contenidos
        $routeProvider.when('/areas/arquitectura/contenidos', {
            templateUrl: baseUrl + 'areas/views/arq-contenidos.view.html',
            controller: 'ArqContenidosController'
        });
    };

    router.$inject = ['$routeProvider'];
    angular
        .module('app')
        .config(router);

})();