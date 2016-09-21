/* global angular */

(function () {

    var Controller = function ($scope, $apiarea, $apikpi, $apimacroproceso, $apiaplicaciones, $apidiagrama, $window, $rootScope, $apidominio) {

        // MARK: - Regresar
        $scope.regresar = function () {
            $window.history.back();
        };

        // Inicia el SPIN
        $rootScope.spin = true;
        // Se oculta la alerta
        $rootScope.showAlert = false;


        // MARK: - Lista de macroprocesos, areas, aplicaciones y kpis
        $scope.macroprocesos = $apimacroproceso.query(function (data) {
            console.log(data);
            $rootScope.spin = false;
        }, function (e) {
            console.log(e);
            $rootScope.spin = false;
            $rootScope.showAlert = false;
            $scope.contentAlert = {
                title: 'ERROR',
                text: 'An error ocurred with the connection.',
                button: 'OK',
                type: 'red',
                event: function () {
                    console.log('Cerraste alerta');
                }
            };
            return;
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

        $scope.dominios = $apidominio.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });
        
        $scope.optionsFiguras = [
            {
                name: 'Start',
                id: 'redondeado',
                shape: 4
            },
            {
                name: 'Process',
                id: 'rectangulo',
                shape: 1
            },
            {
                name: 'Decision',
                id: 'rombo',
                shape: 3
            },
            {
                name: 'End',
                id: 'redondeado',
                shape: 5
            },
            {
                name: 'Data',
                id: 'paralelo',
                shape: 9
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
        
        $scope.brules = [];
        
        
        // MARK: Currents Positions
        $scope.currentMacro = 0;
        $scope.currentProcess = 0;
        $scope.currentCapability = 0;
        $scope.currentBrule = 0;
        $scope.currentYes = $scope.currentYes = 'BR' + ($scope.currentBrule + 2);

        // MARK: Configuraciones iniciales
        $scope.canSave = false;

        $scope.showBruleDetails = false;
        $scope.showCapaDetails = true;
        
        $scope.showDecisions = false;
        $scope.processEditing = true;
        
        $scope.whoIsActive = 'p';
        

        // MARK: - regresa todas las reglas de negocio
        $scope.getBrules = function () {
            var arreglo = [];
            for (var i in $scope.procesos) {
                var proceso = $scope.procesos[i];
                for (var j in proceso.reglas) {
                    var regla = proceso.reglas[j];
                    if (regla.mode == 'on' && regla.name !== '') {
                        var obj = {
                            name: 'BR' + (Number(j) + 1) + ' ' + regla.name,
                            id: j
                        };
                        arreglo.push(obj);
                    }
                }
            }
            return arreglo;
        };
        
        $scope.isValid = function () {
            var obj = {
                status: true,
                message: 'All fine'
            };
            var procesos = $scope.procesos;
            for (var i in procesos) {
                var proceso = procesos[i];
                if (proceso.mode == 'on') {
                    if (proceso.name === '') {
                        obj = {
                            status: false,
                            message: 'Process can not be blank'
                        };
                    } else {

                        for (var j in proceso.capacidades) {
                            var capacidad = proceso.capacidades[j];
                            if (capacidad.mode == 'on') {
                                if (capacidad.name === '') {
                                    obj = {
                                        status: false,
                                        message: 'Capability can not be blank'
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return obj;
        };
        
    
        // MARK: Cambia las vistas y resetea el elemento seleccionado
        $scope.switchViews = function (index) {
            
            if (index === 0) {
                $scope.showBruleDetails = false;
                $scope.showCapaDetails = true;
            } else {
                $scope.showBruleDetails = true;
                $scope.showCapaDetails = false;
            }
            
            if ($scope.whoIsActive == 'p'){
                $scope.processEditing = true;
            } else {
                $scope.processEditing = false;
            }
            
        };
        
        
        
        // MARK: - selecciona un macroproceso 
        $scope.selectMacroprocess = function (model, index) {
            $scope.canSave = true;
            $scope.currentMacro = index;
        };
        
        $scope.deactiveAll = function(){
            if ($scope.procesos.length){
                for (var i in $scope.procesos) {
                    $scope.procesos[i].active = false;
                    if ($scope.procesos[i].capacidades.length){
                        for (var j in $scope.procesos[i].capacidades) {
                            $scope.procesos[i].capacidades[j].active = false;
                        }
                    }
                    if ($scope.procesos[i].reglas.length){
                        for (var k in $scope.procesos[i].reglas) {
                            $scope.procesos[i].reglas[k].active = false;
                        }
                    }
                }
            }

        };
        

        // MARK: - activa un proceso
        $scope.activateProcess = function (index) {
            
            if ($scope.procesos[index].mode == 'off') {
                if ($scope.isValid().status) {
                    
                    $scope.currentProcess = index;
                    $scope.processEditing = true;
                    $scope.deactiveAll();
                    $scope.procesos[index].active = true;

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
                                kpi: '',
                                domain: ''
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
                                kpi: '',
                                forma: {
                                    id: 'rectangulo',
                                    name: 'Process',
                                    shape: 1
                                }
                            }
                        ]
                    };
                    
                    $scope.procesos.push(newProcess);
                    $scope.procesos[index].mode = 'on';
                    $scope.procesos[index].capacidades.push(newCapacidad);
                    $scope.procesos[index].reglas.push(newReglas);
                    
                } else {
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'WARNING',
                        text: $scope.isValid().message,
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    return;
                }
            } else {
                $scope.currentProcess = index;
                $scope.processEditing = true;
                $scope.deactiveAll();
                $scope.procesos[index].active = true;
            }


        };

        // MARK: - Borra el proceso actual
        $scope.deleteProcess = function (index) {
            $scope.deactiveAll();
            $scope.procesos[index].active = true;
            $scope.procesos.splice($scope.currentProcess, 1);
            $scope.currentProcess = index - 1;
        };
        
        
        
        
        // MARK: - activa una capacidad
        $scope.activateCapability = function (parentIndex, index) {

            // Activa
            $scope.processEditing = false;
            $scope.currentProcess = parentIndex;
            $scope.currentCapability = index;

            // Desactiva todos los procesos y capacidades
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                }
            }

            $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].active = true;


            // Crea 
            if ($scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].mode == 'off') {
                // VErifica si se puede actualizar
                if ($scope.isValid().status) {
                    var newCapacidad = {
                        mode: 'off',
                        active: false,
                        name: '',
                        attributes: [
                            {
                                area: '',
                                application: '',
                                kpi: '',
                                domain: ''
                                }
                            ]
                    };
                    $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].mode = 'on';
                    $scope.procesos[$scope.currentProcess].capacidades.push(newCapacidad);
                } else {
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'WARNING',
                        text: $scope.isValid().message,
                        button: 'OK',
                        type: 'red',
                        event: function () {
                            $scope.processEditing = true;
                        }
                    };
                    return;
                }
            }

        };

        // MARK: - Agrega nuevos atributos a la capacidad
        $scope.addMoreAttributes = function () {
            var newAttributes = {
                area: '',
                application: '',
                kpi: '',
                domain: ''
            };
            $scope.procesos[$scope.currentProcess].capacidades[$scope.currentCapability].attributes.push(newAttributes);
        };
        
        // MARK: - Borra la capacidad actual
        $scope.deleteCapabiliy = function () {
            $scope.processEditing = false;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                }
                for (var k in $scope.procesos[i].reglas) {
                    $scope.procesos[i].reglas[k].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].capacidades.splice($scope.currentCapability, 1);
        };
        
        
        
        

        // MARK: - Borra la regla del negocio actual
        $scope.deleteBrule = function () {
            $scope.processEditing = false;
            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].capacidades) {
                    $scope.procesos[i].capacidades[j].active = false;
                }
                for (var k in $scope.procesos[i].reglas) {
                    $scope.procesos[i].reglas[k].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].reglas.splice($scope.currentBrule, 1);
        };


        // MARK: - activa una regla de negocio
        $scope.activateBrule = function (parentIndex, index) {
            
            $scope.brules = $scope.getBrules();
            $scope.processEditing = false;
            $scope.currentProcess = parentIndex;
            $scope.currentBrule = index;

            $scope.currentYes = 'BR' + ($scope.currentBrule + 2);


            for (var i in $scope.procesos) {
                $scope.procesos[i].active = false;
                for (var j in $scope.procesos[i].reglas) {
                    $scope.procesos[i].reglas[j].active = false;
                }
            }
            $scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].active = true;

            if ($scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].attributes) {
                if ($scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].attributes[0].forma) {
                    if ($scope.procesos[$scope.currentProcess].reglas[$scope.currentBrule].attributes[0].forma.id == 'rombo') {
                        $scope.showDecisions = true;
                    } else {
                        $scope.showDecisions = false;
                    }
                } else {
                    $scope.showDecisions = false;
                }
            }

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
        

        // MARK: - Obtiene la forma
        $scope.getForma = function (a) {
            if (a.id == 'rombo') {
                $scope.showDecisions = true;
            } else {
                $scope.showDecisions = false;
            }
        };

        $scope.getYes = function (a) {
            console.log(a);
        };

        $scope.getNo = function (a) {
            console.log(a);
        };

        // MARK: - Limpia los campos actuales
        $scope.clear = function () {
            $scope.procesos = [
                {
                    mode: 'off',
                    active: false,
                    name: '',
                    capacidades: [],
                    reglas: []
                }
            ];
        };
        
        

        // MARK: - Guarda el diagrama
        $scope.save = function () {
            var procesos = $scope.procesos;
            // ARREGLO PARA LLENAR CON LOS PROCESOS
            var procRulesCapArray = [];

            for (var i in procesos) {
                var proceso = procesos[i];
                if (proceso.mode == 'on') {

                    // ARREGLO PARA LLENAR CON REGLAS Y CAPACIDADES
                    var capacidadArray = [];
                    var reglasArray = [];

                    // MARK: - Se llenan las capacidades de cada proceso
                    if (proceso.capacidades.length > 1) {
                        for (var j in proceso.capacidades) {
                            var capacidad = proceso.capacidades[j];
                            if (capacidad.mode == 'on') {
                                if (capacidad.name !== '') {

                                    // ARREGLO PARA LLENAR CON ATRIBUTOS DE CADA CAPACIDAD
                                    var attrArray = [];
                                    for (var k in capacidad.attributes) {
                                        var atributo = capacidad.attributes[k];
                                        var atributoCap = {
                                            "ar_ID": Number(atributo.area.id) || 0,
                                            "app_ID": Number(atributo.application.id) || 0,
                                            "kpi": Number(atributo.kpi.id) || 0
                                        };
                                        attrArray.push(atributoCap);
                                    }
                                    if (capacidad.attributes[0].domain) {
                                        var capacidadJson = {
                                            capid: Number(j),
                                            capaldesc: capacidad.name,
                                            atributosCap: attrArray,
                                            cap_DOM_ID: capacidad.attributes[0].domain.id || 0
                                        };
                                        capacidadArray.push(capacidadJson);
                                    } else {
                                        $rootScope.showAlert = true;
                                        $scope.contentAlert = {
                                            title: 'WARNING',
                                            text: 'The capability must be asigned to a Domain.',
                                            button: 'OK',
                                            type: 'red',
                                            event: function () {}
                                        };
                                        return;
                                    }

                                } else {
                                    $rootScope.showAlert = true;
                                    $scope.contentAlert = {
                                        title: 'WARNING',
                                        text: 'The Capabilitie\'s name can not be blank',
                                        button: 'OK',
                                        type: 'red',
                                        event: function () {}
                                    };
                                    return;
                                }
                            }
                        }
                    } else {
                        $rootScope.showAlert = true;
                        $scope.contentAlert = {
                            title: 'WARNING',
                            text: 'The diagram must have at least one capability',
                            button: 'OK',
                            type: 'red',
                            event: function () {}
                        };
                        return;
                    }

                    // MARK: - Se llenan las reglas de cada proceso
                    for (var l in proceso.reglas) {
                        var regla = proceso.reglas[l];
                        if (regla.mode == 'on') {
                            var reglaJson = {};
                            if (regla.attributes[0].id == 'rombo') {
                                reglaJson = {
                                    id_paso: Number(l),
                                    nombre_regla: regla.name,
                                    flow: [
                                        {
                                            area_ID: regla.attributes[0].area.id || 0,
                                            next_STEP: Number(l) + 1,
                                            desc_TYPE: 'YES',
                                            pros_ID: 0,
                                            flow_ID: 0,
                                            shape_ID: 3,
                                            dia_STEP_ID: Number(l),
                                            diagram_ID: 0,
                                            app_ID: Number(regla.attributes[0].application.id) || 0
                                        },
                                        {
                                            area_ID: regla.attributes[0].area.id || 0,
                                            next_STEP: Number(regla.attributes[0].no.id),
                                            desc_TYPE: 'NO',
                                            pros_ID: 0,
                                            flow_ID: 0,
                                            shape_ID: 3,
                                            dia_STEP_ID: Number(l),
                                            diagram_ID: 0,
                                            app_ID: Number(regla.attributes[0].application.id) || 0
                                        }
                                    ]
                                };
                            } else {
                                reglaJson = {
                                    id_paso: Number(l),
                                    nombre_regla: regla.name,
                                    flow: [{
                                        area_ID: regla.attributes[0].area.id || 0,
                                        next_STEP: Number(l) + 1,
                                        desc_TYPE: ' ',
                                        pros_ID: 0,
                                        flow_ID: 0,
                                        shape_ID: regla.attributes[0].forma.shape,
                                        dia_STEP_ID: Number(l),
                                        diagram_ID: 0,
                                        app_ID: Number(regla.attributes[0].application.id) || 0
                                    }]
                                };
                            }
                            reglasArray.push(reglaJson);
                        }

                    }

                    // MARK: - Se llena el proceso
                    if (procesos[i].name !== '') {
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
                            reglas: [{
                                rules: reglasArray
                            }]
                        };
                        procRulesCapArray.push(procRulesCap);
                    } else {
                        $rootScope.showAlert = true;
                        $scope.contentAlert = {
                            title: 'WARNING',
                            text: 'Process name can not be blank',
                            button: 'OK',
                            type: 'red',
                            event: function () {}
                        };
                        return;
                    }
                }
            }

            var datosDiagrama = {
                procRulesCap: procRulesCapArray
            };
            var macroprocesoDiagrama = new $apidiagrama(datosDiagrama);
            
            if (datosDiagrama.procRulesCap.length) {
                macroprocesoDiagrama.$save(function (data) {
                    console.log(data);
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The diagram was created.',
                        button: 'OK',
                        type: 'blue',
                        event: function () {
                            $scope.clear();
                        }
                    };
                    return;
                }, function (e) {
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'Error in DATABASE',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    console.log(e);
                    return;
                });
            } else {
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'WARNING',
                    text: 'Diagram can not be empty',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            }
        };


    };
    Controller.$inject = ['$scope', '$apiarea', '$apikpi', '$apimacroproceso', '$apiaplicaciones', '$apidiagrama', '$window', '$rootScope', '$apidominio'];
    angular
        .module('mAbc')
        .controller('AbcDiagramaController', Controller);
})();