/* global angular */

(function () {

    var Controller = function ($scope) {

        $scope.macroprocesos = ['CRM', 'Customer Management', 'CRM', 'Customer Management', 'CRM', 'Customer Management'];
        $scope.areas = ['IT', 'CRM', 'SRM'];
        $scope.aplicaciones = ['Aplicacion 1', 'Aplicacion 2', 'Aplicacion 3'];
        $scope.kpis = ['KPI 1', 'KPI 2', 'KPI 3'];
        $scope.procesos = [
            {
                mode: 'off',
                active: false,
                name: '',
                capacidades: [],
                reglas: []
            }
        ];
        
        $scope.hideBRule = true;

        $scope.currentProcess = 0;

        $scope.currentCapability = 0;
        
        $scope.currentBrule = 0;

        $scope.processEditing = true;

        // MARK: - activa un proceso
        $scope.activateProcess = function (index) {
            $scope.processEditing = true;
            $scope.currentProcess = index;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].active = true;
            if ($scope.procesos[index].mode == 'off') {
                var newProcess = {
                    mode: 'off',
                    active: false,
                    name: '',
                    capacidades: [],
                    reglas: []
                };
                var newCapacidad = {
                    mode: 'off',
                    active: false,
                    name: '',
                    attributes: [
                        {
                            area: '',
                            application: '',
                            kpi: ''
                        }
                    ]
                };
                var newReglas = {
                    mode: 'off',
                    active: false,
                    name: '',
                    attributes: [
                        {
                            area: '',
                            application: '',
                            kpi: ''
                        }
                    ]
                };
                $scope.procesos.push(newProcess);
                $scope.procesos[index].mode = 'on';
                $scope.procesos[index].capacidades.push(newCapacidad);
                $scope.procesos[index].reglas.push(newReglas);
            }
        };


        // MARK: - activa una capacidad
        $scope.activateCapability = function (parentIndex, index) {
            $scope.processEditing = false;
            $scope.currentProcess = parentIndex;
            $scope.currentCapability = index;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].active = true;
            if ($scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].mode == 'off') {
                var newCapacidad = {
                    mode: 'off',
                    active: false,
                    name: '',
                    attributes: [
                        {
                            area: '',
                            application: '',
                            kpi: ''
                        }
                    ]
                };
                $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].mode = 'on';
                $scope.procesos[$scope.currentProcess].capacidades.push(newCapacidad);
            }
        };


        // MARK: - Agrega nuevos atributos a la capacidad
        $scope.addMoreAttributes = function () {
            var newAttributes = {
                area: '',
                application: '',
                kpi: ''
            };
            $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].attributes.push(newAttributes);

        };
        
        
        // MARK: - activa una regla de negocio
        $scope.activateBrule = function (parentIndex, index) {
            $scope.processEditing = false;
            $scope.currentProcess = parentIndex;
            $scope.currentBrule = index;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].reglas) {
                    $scope.procesos[i].reglas[j].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].active = true;
            if ($scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].mode == 'off') {
                var newRegla = {
                    mode: 'off',
                    active: false,
                    name: '',
                    attributes: [
                        {
                            area: '',
                            application: '',
                            kpi: ''
                        }
                    ]
                };
                $scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].mode = 'on';
                $scope.procesos[$scope.currentProcess].reglas.push(newRegla);
            }
        };


        // MARK: - Agrega nuevos atributos a la regla de negocio
        $scope.addMoreAttributesToBrule = function () {
            var newAttributes = {
                area: '',
                application: '',
                kpi: ''
            };
            $scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].attributes.push(newAttributes);
        };


    };
    Controller.$inject = ['$scope'];
    angular
        .module('mAbc')
        .controller('AbcDiagramaController', Controller);
})();