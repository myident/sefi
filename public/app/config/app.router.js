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
        
        // Detalle Procesos
        $routeProvider.when('/ecosistema', {
            templateUrl: baseUrl + 'ecosistema/views/vista-ecosistemas.view.html',
            controller: 'VistaEcosistemasController'
        });
    
        // Detalle Procesos
        $routeProvider.when('/areas/arquitectura', {
            templateUrl: baseUrl + 'areas/views/arquitectura.view.html',
            controller: 'ArquitecturaController'
        });
    };

    router.$inject = ['$routeProvider'];
    angular
        .module('app')
        .config(router);

})();