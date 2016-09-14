/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, $apidominio, $apimegaproceso, $apiproceso, $apicapacidad, $apiarea, $apikpi) {
        $scope.types = $abcCreate.types;
        $scope.toggleType = function (index) {
            for (var i in $scope.types) {
                if (i == index) {
                    $scope.types[index].active = !$scope.types[index].active;
                } else {
                    $scope.types[i].active = false;
                }
            }
        };

        // MARK: - GET Lista de los Dominios
        $scope.listaDominios = $apidominio.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        
        // MARK: - GET Lista de los Megaprocesos
        $scope.listaMegaprocesos = $apimegaproceso.query(function(data){
            console.log(data);
        }, function(e){
            console.log(e);
        });
        
        // MARK: - GET Lista de los Megaprocesos
        $scope.listaAreas = $apiarea.query(function(data){
            console.log(data);
        }, function(e){
            console.log(e);
        });
        

        // MARK: - POST Guarda un Dominio
        $scope.saveDomain = function (name, shortname) {
            var dominio = new $apidominio();
            dominio.LNAME = name;
            dominio.SNAME = shortname;
            dominio.$save(function (data) {
                console.log(data);
            }, function (e) {
                console.log(e);
            });
        };

        // MARK: - POST Guarda un Megaproceso
        $scope.saveMega = function (name, domain) {
            var megaproceso = new $apimegaproceso();
            megaproceso.DOMID = domain;
            megaproceso.LDESC = name;
            megaproceso.$save(function (data) {
                console.log(data);
            }, function (e) {
                console.log(e);
            });
        };

        // MARK: - POST Guarda un Macroproceso
        $scope.saveMacro = function () {

        };

        // MARK: - POST Guarda un Proceso
        $scope.saveProceso = function (name) {
            var proceso = new $apiproceso();
            proceso.LDESC = name;
            proceso.$save(function (data) {
                console.log(data);
            }, function (e) {
                console.log(e);
            });
        };

        // MARK: - POST Guarda una Capacidad
        $scope.saveCapacidad = function (name, domain) {
            var capacidad = new $apicapacidad();
            capacidad.DOM = domain;
            capacidad.LDESC = name;
            capacidad.$save(function (data) {
                console.log(data);
            }, function (e) {
                console.log(e);
            });
        };

        //MARK: - POST Guarda una Regla de negocio
        $scope.saveBrule = function (name) {
            console.log(name);
        };

        // MARK: - POST Guarda un Area 
        $scope.saveArea = function (name, type) {
            var area = new $apiarea();
            area.LDESC = name;
            area.TIPO = type;
            area.$save(function (data) {
                console.log(data);
            }, function (e) {
                console.log(e);
            });
        };
        
        // MARK: - POST Guarda un KPI
        $scope.saveKpi = function (name, shortname, level) {
            var kpi = new $apikpi();
            kpi.LDESC = name;
            kpi.SDESC = shortname;
            kpi.TIPO = level;
            kpi.$save(function(data){
                console.log(data);
            }, function(e){
                console.log(e);
            });
        };

        // MARK: - POST Guarda una Aplicación
        $scope.saveAplicacion = function (name) {
            console.log(name);
        };

    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', '$apidominio', '$apimegaproceso', '$apiproceso', '$apicapacidad', '$apiarea', '$apikpi'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();