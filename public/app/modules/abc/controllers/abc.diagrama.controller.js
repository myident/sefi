/* global angular */

(function () {

    var Controller = function ($scope, $apiarea, $apikpi, $apimacroproceso, $apiaplicaciones, $apidiagrama, $window, $rootScope, $apidominio, $apimegaproceso, $abcdiagrama, $abcdiagramadesc) {

        // MARK: - Regresar
        $scope.regresar = function () {
            $window.history.back();
        };

        // Inicia el SPIN
        $rootScope.spin = true;
        // Se oculta la alerta
        $rootScope.showAlert = false;

        $scope.megaprocesos = $apimegaproceso.query(
            function (data) {
                console.log('Megas');
                console.log(data);
            },
            function (e) {
                console.log(e);
            });

        // MARK: - Lista de macroprocesos, areas, aplicaciones y kpis
        $scope.macroprocesos = $apimacroproceso.query(
            function (data) {
                console.log('Macros');
                console.log(data);
                $rootScope.spin = false;
            },
            function (e) {
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

        $scope.areas = $apiarea.query(
            function (data) {
                console.log('Areas');
                console.log(data);
            },
            function (e) {
                console.log(e);
            });
        $scope.aplicaciones = $apiaplicaciones.query(
            function (data) {
                console.log('Aplicaciones');
                console.log(data);
            },
            function (e) {
                console.log(e);
            });

        $scope.kpis = $apikpi.query(
            function (data) {
                console.log('KPI');
                console.log(data);
            },
            function (e) {
                console.log(e);
            });

        $scope.dominios = $apidominio.query(
            function (data) {
                console.log('Dominios');
                console.log(data);
            },
            function (e) {
                console.log(e);
            });

        $scope.optionsFiguras = $abcdiagrama.optionsFiguras;
        var data = $abcdiagramadesc.getAll();
        $scope.procesos = $abcdiagrama.setProcesosFromService(data);
        $scope.procesosInitial = $abcdiagramadesc.getInitial();
        console.log($scope.procesos);

        $scope.brules = [];

        // MARK: Currents Positions
        $scope.currentMacro = 0;
        $scope.currentProcess = 0;
        $scope.currentCapability = 0;
        $scope.currentBrule = 0;
        $scope.currentYes = 'BR' + ($scope.currentBrule + 2);

        // MARK: Configuraciones iniciales
        $scope.canSave = false;
        $scope.showBruleDetails = false;
        $scope.showCapaDetails = true;
        $scope.showDecisions = false;
        $scope.processEditing = true;
        $scope.whoIsActive = 'p';

        // MARK: - Verifica que no haya errores en el diagrama
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

        // MARK: - regresa todas las reglas de negocio que se han creado para agregarlas al select
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

        // MARK: - Verifica si la regla de negocio determinada es una decisión para mostrar sus opciones
        $scope.getShowDecisions = function (parentIndex, index) {
            var showDecisions = false;
            if ($scope.procesos[parentIndex].reglas[index].attributes) {
                if ($scope.procesos[parentIndex].reglas[index].attributes[0].forma) {
                    if ($scope.procesos[parentIndex].reglas[index].attributes[0].forma.id == 'rombo') {
                        showDecisions = true;
                    } else {
                        showDecisions = false;
                    }
                } else {
                    showDecisions = false;
                }
            }
            return showDecisions;
        };

        // MARK: - Obtiene el dominio del macro
        $scope.getMegaDomain = function (index) {
            var obj = {};
            var macro = $scope.macroprocesos[index];
            var mega = {};
            for (var i in $scope.megaprocesos) {
                if (macro.mega_id == $scope.megaprocesos[i].id) {
                    mega = $scope.megaprocesos[i];
                }
            }
            for (var j in $scope.dominios) {
                if (mega.id_dominio == $scope.dominios[j].id) {
                    obj = $scope.dominios[j];
                }
            }
            return obj;
        };
        // MARK: - Desactiva todos los elementos
        $scope.deactiveAll = function () {
            if ($scope.procesos.length) {
                for (var i in $scope.procesos) {
                    $scope.procesos[i].active = false;
                    if ($scope.procesos[i].capacidades.length) {
                        for (var j in $scope.procesos[i].capacidades) {
                            $scope.procesos[i].capacidades[j].active = false;
                        }
                    }
                    if ($scope.procesos[i].reglas.length) {
                        for (var k in $scope.procesos[i].reglas) {
                            $scope.procesos[i].reglas[k].active = false;
                        }
                    }
                }
            }

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

            if ($scope.whoIsActive == 'p') {
                $scope.processEditing = true;
            } else {
                $scope.processEditing = false;
            }

        };

        // MARK: - activa un macroproceso 
        $scope.activeMacroprocess = function (model, index) {
            $scope.canSave = true;
            $scope.currentMacro = index;
            $scope.dominioDelMacro = $scope.getMegaDomain(index);
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
                        name: '',
                        diagram_id: 0,
                        mega_ID: 0,
                        domid: 0,
                        cat_PRO: 0,
                        pro_ID: 0,
                        macr_ID: 0,
                        mode: 'off',
                        active: false,
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

            if ($scope.procesos[parentIndex].capacidades[index].mode == 'off') {
                if ($scope.isValid().status) {

                    $scope.currentProcess = parentIndex;
                    $scope.currentCapability = index;
                    $scope.processEditing = false;
                    $scope.deactiveAll();
                    $scope.procesos[parentIndex].capacidades[index].active = true;

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

                    $scope.procesos[parentIndex].capacidades.push(newCapacidad);
                    $scope.procesos[parentIndex].capacidades[index].mode = 'on';

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
                $scope.currentProcess = parentIndex;
                $scope.currentCapability = index;
                $scope.processEditing = false;
                $scope.deactiveAll();
                $scope.procesos[parentIndex].capacidades[index].active = true;
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
            $scope
                .procesos[$scope.currentProcess]
                .capacidades[$scope.currentCapability]
                .attributes.push(newAttributes);
        };

        // MARK: - Borra la capacidad actual
        $scope.deleteCapabiliy = function () {
            $scope.deactiveAll();
            $scope
                .procesos[$scope.currentProcess]
                .capacidades.splice($scope.currentCapability, 1);
        };

        // MARK: - activa una regla de negocio
        $scope.activateBrule = function (parentIndex, index) {
            console.log($scope.procesos[parentIndex].reglas[index]);
            if ($scope.procesos[parentIndex].reglas[index].mode == 'off') {
                if ($scope.isValid().status) {
                    $scope.currentProcess = parentIndex;
                    $scope.currentBrule = index;
                    $scope.processEditing = false;
                    $scope.deactiveAll();
                    $scope.procesos[parentIndex].reglas[index].active = true;

                    $scope.brules = $scope.getBrules();
                    $scope.currentYes = 'BR' + ($scope.currentBrule + 2);
                    $scope.showDecisions = $scope.getShowDecisions(parentIndex, index);

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

                    $scope.procesos[parentIndex].reglas.push(newRegla);
                    $scope.procesos[parentIndex].reglas[index].mode = 'on';
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
                $scope.currentProcess = parentIndex;
                $scope.currentBrule = index;
                $scope.processEditing = false;
                $scope.deactiveAll();
                $scope.procesos[parentIndex].reglas[index].active = true;

                $scope.brules = $scope.getBrules();
                $scope.currentYes = 'BR' + ($scope.currentBrule + 2);
                $scope.showDecisions = $scope.getShowDecisions(parentIndex, index);
            }
        };

        // MARK: - Borra la regla del negocio actual
        $scope.deleteBrule = function () {
            $scope.deactiveAll();
            $scope
                .procesos[$scope.currentProcess]
                .reglas.splice($scope.currentBrule, 1);
        };

        // MARK: - Obtiene la forma
        $scope.getForma = function (a) {
            if (a.id == 'rombo') {
                $scope.showDecisions = true;
            } else {
                $scope.showDecisions = false;
            }
        };

        // MARK: Obtiene el valor de las decisiones actuales
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

        // MARK: - Llena los procesos
        $scope.fillProcesos = function () {
            var procesos = [];
            for (var i in $scope.procesos) {
                if ($scope.procesos[i].mode == 'on') {
                    var proceso = {
                        ldescproc: $scope.procesos[i].name,
                        desc_diagram: $scope.macroprocess.name,
                        domid: Number($scope.dominioDelMacro.id),
                        mega_ID: Number($scope.macroprocesos[$scope.currentMacro].mega_id),
                        macr_ID: Number($scope.macroprocess.id),
                        capacidad: $scope.fillCapacidadesDeProceso($scope.procesos[i]),
                        reglas: $scope.fillReglasDeProceso($scope.procesos[i]),
                        //reglas: [
                        //{
                        //rules: $scope.fillReglasDeProceso($scope.procesos[i])
                        //}
                        //],
                        pro_ID: 0,
                        diagram_id: 0,
                        cat_PRO: 0
                    };
                    procesos.push(proceso);
                }
            }
            return procesos;
        };

        // MARK: - Llena los atributos de la capacidad
        $scope.fillAtributosDeCapacidad = function (capacidad) {
            var atributos = [];
            for (var i in capacidad.attributes) {
                var atributo = {
                    ar_ID: capacidad.attributes[i].area.id || 0,
                    app_ID: capacidad.attributes[i].application.id || 0,
                    kpi: capacidad.attributes[i].kpi.id || 0
                };
                atributos.push(atributo);
            }
            return atributos;
        };

        // MARK: - LLena las capacidades
        $scope.fillCapacidadesDeProceso = function (proceso) {
            var capacidades = [];
            for (var i in proceso.capacidades) {
                if (proceso.capacidades[i].mode == 'on') {
                    var capacidad = {
                        capaldesc: proceso.capacidades[i].name,
                        capid: 0,
                        cap_DOM_ID: $scope.dominioDelMacro.id,
                        atributosCap: $scope.fillAtributosDeCapacidad(proceso.capacidades[i])
                    };
                    capacidades.push(capacidad);
                }
            }
            return capacidades;
        };

        // MARK: - Llena el flow de las reglas
        $scope.fillFlowDeReglas = function (regla) {

            var flow = [];

            if (regla.attributes[0].forma.id == 'rombo') {
                flow = [
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: 0,
                        desc_TYPE: 'YES',
                        pros_ID: 0,
                        flow_ID: 0,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: 0,
                        diagram_ID: 0,
                        app_ID: regla.attributes[0].application.id || 0
                    },
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: 0,
                        desc_TYPE: 'NO',
                        pros_ID: 0,
                        flow_ID: 0,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: 0,
                        diagram_ID: 0,
                        app_ID: regla.attributes[0].application.id || 0
                    }
                ];
            } else {
                flow = [
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: 0,
                        desc_TYPE: '',
                        pros_ID: 0,
                        flow_ID: 0,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: 0,
                        diagram_ID: 0,
                        app_ID: regla.attributes[0].application.id || 0
                    }
                ];
            }
            return flow;
        };

        // MARK: - Llena las reglas del proceso
        $scope.fillReglasDeProceso = function (proceso) {
            var reglas = [];
            for (var i in proceso.reglas) {
                if (proceso.reglas[i].mode == 'on') {
                    var regla = {
                        rules: [
                            {
                                id_paso: 0,
                                nombre_regla: proceso.reglas[i].name,
                                flow: $scope.fillFlowDeReglas(proceso.reglas[i])
                            }
                        ]
                    };
                    //var regla = {
                    //id_paso: 0,
                    //nombre_regla: proceso.reglas[i].name,
                    //flow: $scope.fillFlowDeReglas(proceso.reglas[i])
                    //};
                    reglas.push(regla);
                }
            }
            return reglas;
        };


        $scope.newSave = function () {
            $rootScope.spin = true;
            var obj = {
                "procRulesCap": [
                    {
                        "desc_diagram": "",
                        "diagram_id": 0,
                        "capacidad": [
                            {
                                "atributosCap": [
                                    {
                                        "ar_ID": 0,
                                        "app_ID": 0,
                                        "kpi": 0
                                    }
                                ],
                                "cap_DOM_ID": 0,
                                "capid": 0,
                                "capaldesc": ""
                            }
                        ],
                        "reglas": [
                            {
                                "rules": [
                                    {
                                        "id_paso": 0,
                                        "nombre_regla": null,
                                        "flow": [
                                            {
                                                "area_ID": 0,
                                                "next_STEP": 0,
                                                "desc_TYPE": "",
                                                "pros_ID": 0,
                                                "flow_ID": 0,
                                                "shape_ID": 0,
                                                "dia_STEP_ID": 0,
                                                "diagram_ID": 0,
                                                "app_ID": 0
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "ldescproc": "",
                        "mega_ID": 0,
                        "domid": 0,
                        "cat_PRO": 0,
                        "pro_ID": 0,
                        "macr_ID": 0
                    }
                ]
            };
            obj.procRulesCap = $scope.fillProcesos();
            console.log(JSON.stringify($scope.fillProcesos()));
            //            if ($scope.procesos.length > 1){
            //                var canSave = false;
            //                for (var m in $scope.procesos){
            //                    if ($scope.procesos[m].capacidades.length > 1){
            //                        canSave = true;
            //                    }
            //                }
            //                if (canSave){
            //                    if ($scope.isValid().status){
            //                        var macroprocesoDiagrama = new $apidiagrama(obj);
            //                        macroprocesoDiagrama.$save(function(data){
            //                            console.log('Listo');
            //                            console.log(data);
            //                            $rootScope.spin = false;
            //                            $rootScope.showAlert = true;
            //                            $scope.contentAlert = {
            //                                title: 'DONE',
            //                                text: 'The diagram was created',
            //                                button: 'OK',
            //                                type: 'blue',
            //                                event: function () {}
            //                            };
            //                        }, function(e){
            //                            console.log(e);
            //                            $rootScope.spin = false;
            //                            $rootScope.showAlert = true;
            //                            $scope.contentAlert = {
            //                                title: 'ERROR',
            //                                text: 'An error ocurred with the connection.',
            //                                button: 'OK',
            //                                type: 'red',
            //                                event: function () {
            //                                    console.log('Cerraste alerta');
            //                                }
            //                            };
            //                        });
            //                    } else {
            //                        $rootScope.spin = false;
            //                        $rootScope.showAlert = true;
            //                        $scope.contentAlert = {
            //                            title: 'ERROR',
            //                            text: $scope.isValid().message,
            //                            button: 'OK',
            //                            type: 'red',
            //                            event: function () {}
            //                        };
            //                    }
            //                } else {
            //                    $rootScope.spin = false;
            //                    $rootScope.showAlert = true;
            //                    $scope.contentAlert = {
            //                        title: 'ERROR',
            //                        text: 'You need to add at least one capability',
            //                        button: 'OK',
            //                        type: 'red',
            //                        event: function () {}
            //                    };
            //                }
            //            } else {
            //                $rootScope.spin = false;
            //                $rootScope.showAlert = true;
            //                $scope.contentAlert = {
            //                    title: 'ERROR',
            //                    text: 'You need to add at least one Process and One Capability',
            //                    button: 'OK',
            //                    type: 'red',
            //                    event: function () {}
            //                };
            //            }


        };


    };
    Controller.$inject = ['$scope', '$apiarea', '$apikpi', '$apimacroproceso', '$apiaplicaciones', '$apidiagrama', '$window', '$rootScope', '$apidominio', '$apimegaproceso', '$abcdiagrama', '$abcdiagramadesc'];
    angular
        .module('mAbc')
        .controller('AbcDiagramaController', Controller);
})();