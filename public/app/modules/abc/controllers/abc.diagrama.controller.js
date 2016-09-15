/* global angular */

(function () {

    var Controller = function ($scope, $apiarea, $apikpi, $apimacroproceso, $apiaplicaciones, $apidiagrama) {

        $scope.macroprocesos = $apimacroproceso.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        $scope.areas = $apiarea.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        $scope.aplicaciones = $apiaplicaciones.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        $scope.kpis = $apikpi.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        
        $scope.canSave = false;

        $scope.hideBRule = true;
        
        $scope.currentMacro = 0;

        $scope.currentProcess = 0;

        $scope.currentCapability = 0;

        $scope.currentBrule = 0;

        $scope.processEditing = true;

        $scope.optionsFiguras = [
            {
                name: 'Redondeado',
                id: 'redondeado'
            },
            {
                name: 'Rectangulo',
                id: 'rectangulo'
            },
            {
                name: 'Rombo',
                id: 'rombo'
            },
            {
                name: 'Rombo con tache',
                id: 'rombo-tache'
            }
        ];
        
        $scope.procesos = [
            {
                mode: 'off',
                active: false,
                name: '',
                capacidades: [],
                reglas: []
            }
        ];

        // MARK: - activa un proceso
        $scope.activateProcess = function (index) {
            $scope.processEditing = true;
            $scope.currentProcess = index;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                    $scope.procesos[i].reglas[j].active = false;
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
                    forma: 0,
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
                    forma: 0,
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
        
        $scope.selectMacroprocess = function(model, index){
            $scope.canSave = true;
            $scope.currentMacro = index;
        };
        
        $scope.clear = function(){
            
        };
        
        $scope.save = function(){
            var procesos = $scope.procesos;
            var procRulesCapArray = [];
            
            for (var i in procesos){
                var proceso = procesos[i];
                if (proceso.mode == 'on'){
                    
                    var capacidadArray = [];
                    var reglasArray = [];
                    if (proceso.capacidades.length > 1){
                        for(var j in proceso.capacidades){
                            var capacidad = proceso.capacidades[j];
                            if (capacidad.mode == 'on'){

                                var attrArray = [];

                                for (var k in capacidad.attributes){
                                    var atributo = capacidad.attributes[k];
                                    var atributoCap = {
                                        "ar_ID": Number(atributo.area.id) || 0,
                                        "app_ID": Number(atributo.application.id) || 0,
                                        "kpi": Number(atributo.kpi.id) || 0
                                    };
                                    attrArray.push(atributoCap);
                                }

                                var capacidadJson = {
                                    capid: Number(j),
                                    capaldesc: capacidad.name,
                                    atributosCap: attrArray

                                };
                                capacidadArray.push(capacidadJson);
                            }
                        }
                    } else {
                        alert('Error, no puedes guardar un proceso sin capacidades');
                        return;
                    }
                    

                    
                    for (var l in proceso.reglas){
                        var regla = proceso.reglas[l];
                        if (regla.mode == 'on'){
                            var reglaJson = {
                                id_paso: Number(l),
                                nombre_regla: regla.name,
                                flow: [{
                                    area_ID: regla.attributes[0].area.id || 0,
                                    next_STEP: Number(l) + 1,
                                    desc_TYPE: regla.attributes[0].forma.name,
                                    pros_ID: 0,
                                    flow_ID: 0,
                                    shape_ID: regla.attributes[0].forma.id == 'rectangulo' ? 0 : (regla.attributes[0].forma.id == 'redondeado' ? 1 : 2),
                                    dia_STEP_ID: Number(l),
                                    diagram_ID: 0,
                                    app_ID: Number(regla.attributes[0].application.id) || 0
                                }]
                            };
                            reglasArray.push(reglaJson);
                        }
                        
                    }
                    
                    var procRulesCap = {
                        ldescproc: procesos[i].name,
                        domid: 3,
                        cat_PRO: 0,
                        pro_ID: 0,
                        macr_ID: Number($scope.macroprocess.id),
                        mega_ID: Number($scope.macroprocesos[$scope.currentMacro].mega_id),
                        desc_diagram: $scope.macroprocess.name,
                        diagram_id: 0,
                        capacidad: capacidadArray,
                        reglas: [{rules:reglasArray}]
                    };
                    procRulesCapArray.push(procRulesCap);
                }

            }
            
            var datosDiagrama = {
                
                "procRulesCap": procRulesCapArray || [{
                    "ldescproc": "",
                    "domid": 0,
                    "mega_ID": 0,
                    "cat_PRO": 0,
                    "pro_ID": 0,
                    "macr_ID": 0,
                    "desc_diagram": "",
                    "diagram_id": 0,
                    "capacidad": [{
                        "atributosCap": [{
                            "ar_ID": 0,
                            "app_ID": 0,
                            "kpi": 0
                        }],
                        "capid": 0,
                        "capaldesc": ""
                    }],
                    "reglas": [{
                        "rules": [{
                            "id_paso": 0,
                            "nombre_regla": null,
                            "flow": [{
                                "area_ID": 0,
                                "next_STEP": 0,
                                "desc_TYPE": "",
                                "pros_ID": 0,
                                "flow_ID": 0,
                                "shape_ID": 0,
                                "dia_STEP_ID": 0,
                                "diagram_ID": 0,
                                "app_ID": 0
                            }]
                        }]
                    }]
                }]
                
            };
            
            
            var macroprocesoDiagrama = new $apidiagrama(datosDiagrama);
            macroprocesoDiagrama.$save(function(data){
                console.log(data);
            }, function(e){
                console.log(e);
            });
            console.log($scope.procesos);
            console.log(macroprocesoDiagrama);
            console.log(procRulesCapArray);
        };


    };
    Controller.$inject = ['$scope', '$apiarea', '$apikpi', '$apimacroproceso', '$apiaplicaciones', '$apidiagrama'];
    angular
        .module('mAbc')
        .controller('AbcDiagramaController', Controller);
})();