/* global angular */

// Se ocupa para enviar al homs

(function() {
    var Service = function () {
        var self = this;
        var contador = 1;
        // MARK: - Llena los procesos
        self.fillProcesos = function (scopeProcesos, scopeMacroprocess, dominioMacro, macroprocesos, currentMacro) {
            var procesos = [];
            for (var i in scopeProcesos) {
                
                if (scopeProcesos[i].mode == 'on') {
                    var proceso = {
                        ldescproc: scopeProcesos[i].name,
                        desc_diagram: scopeMacroprocess.name,
                        domid: Number(dominioMacro.id),
                        mega_ID: Number(macroprocesos[currentMacro].mega_id),
                        macr_ID: Number(scopeMacroprocess.id),
                        capacidad: self.fillCapacidadesDeProceso(scopeProcesos[i], dominioMacro),
                        reglas: self.fillReglasDeProceso(scopeProcesos[i]),
                        //reglas: [
                        //{
                        //rules: self.fillReglasDeProceso(scopeProcesos[i])
                        //}
                        //],
                        pro_ID: scopeProcesos[i].pro_ID,
                        diagram_id: scopeProcesos[i].diagram_id,
                        cat_PRO: scopeProcesos[i].cat_PRO
                    };
                    procesos.push(proceso);
                }
            }
            return procesos;
        };

        // MARK: - Llena los atributos de la capacidad
        self.fillAtributosDeCapacidad = function (capacidad) {
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
        self.fillCapacidadesDeProceso = function (proceso, dominioMacro) {
            var capacidades = [];
            for (var i in proceso.capacidades) {
                if (proceso.capacidades[i].mode == 'on') {
                    var capacidad = {
                        capaldesc: proceso.capacidades[i].name,
                        capid: proceso.capacidades[i].capid,
                        cap_DOM_ID: dominioMacro.id,
                        atributosCap: self.fillAtributosDeCapacidad(proceso.capacidades[i])
                    };
                    capacidades.push(capacidad);
                }
            }
            return capacidades;
        };

        // MARK: - Llena el flow de las reglas
        self.fillFlowDeReglas = function (regla) {

            var flow = [];

            if (regla.attributes[0].forma.id == 'rombo') {
                flow = [
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: contador + 1,
                        desc_TYPE: 'YES',
                        pros_ID: regla.attributes[0].pros_ID,
                        flow_ID: regla.attributes[0].flow_ID,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: regla.attributes[0].dia_STEP_ID,
                        diagram_ID: regla.attributes[0].diagram_ID,
                        app_ID: regla.attributes[0].application.id || 0
                    },
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: regla.attributes[0].no ? regla.attributes[0].no.id : contador,
                        desc_TYPE: 'NO',
                        pros_ID: regla.attributes[0].pros_ID,
                        flow_ID: regla.attributes[0].flow_ID,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: regla.attributes[0].dia_STEP_ID,
                        diagram_ID: regla.attributes[0].diagram_ID,
                        app_ID: regla.attributes[0].application.id || 0
                    }
                ];
            } else {
                flow = [
                    {
                        area_ID: regla.attributes[0].area.id || 0,
                        next_STEP: contador + 1,
                        desc_TYPE: ' ',
                        pros_ID: regla.attributes[0].pros_ID,
                        flow_ID: regla.attributes[0].flow_ID,
                        shape_ID: regla.attributes[0].forma.shape,
                        dia_STEP_ID: regla.attributes[0].dia_STEP_ID,
                        diagram_ID: regla.attributes[0].diagram_ID,
                        app_ID: regla.attributes[0].application.id || 0
                    }
                ];
            }
            return flow;
        };

        // MARK: - Llena las reglas del proceso
        self.fillReglasDeProceso = function (proceso) {
            var reglas = [];
            for (var i in proceso.reglas) {
                if (proceso.reglas[i].mode == 'on') {
                    var regla = {
                        rules: [
                            {
                                id_paso: contador,
                                nombre_regla: proceso.reglas[i].name,
                                flow: self.fillFlowDeReglas(proceso.reglas[i])
                            }
                        ]
                    };
                    //var regla = {
                    //id_paso: 0,
                    //nombre_regla: proceso.reglas[i].name,
                    //flow: $scope.fillFlowDeReglas(proceso.reglas[i])
                    //};
                    reglas.push(regla);
                    contador++;
                }
            }
            return reglas;
        };
    };
    angular.module('mAbc').service('$abcParseRemote', Service);
})();