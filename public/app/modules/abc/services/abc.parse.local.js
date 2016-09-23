/* global angular */

// Se ocupa para recibir el objeto

(function () {
    var Service = function () {
        var self = this;

        self.setProcesosFromService = function (data, apps, areas, dominios, kpis) {
            var procesos = [];
            for (var i in data) {
                var proceso = {
                    name: data[i].ldescproc,
                    diagram_id: data[i].diagram_id,
                    mega_ID: data[i].mega_ID,
                    domid: data[i].domid,
                    cat_PRO: data[i].cat_PRO,
                    pro_ID: data[i].pro_ID,
                    macr_ID: data[i].macr_ID,
                    mode: 'on',
                    active: false,
                    capacidades: self.setCapacidadesAProcesos(data[i].capacidad, apps, areas, dominios, kpis),
                    reglas: self.setReglasAProcesos(data[i].reglas, apps, areas)
                };
                procesos.push(proceso);
            }
            var lastProcess = {
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
            procesos.push(lastProcess);
            return procesos;
        };
        self.setCapacidadesAProcesos = function (capacidad, apps, areas, dominios, kpis) {
            var capacidades = [];
            for (var i in capacidad) {
                var newCapacidad = {
                    name: capacidad[i].capaldesc,
                    cap_DOM_ID: capacidad[i].cap_DOM_ID,
                    capid: capacidad[i].capid,
                    attributes: self.setAtributosACapacidades(capacidad[i].atributosCap, apps, areas, dominios, kpis),
                    mode: 'on',
                    active: false
                };
                capacidades.push(newCapacidad);
            }
            var lastCapability = {
                name: '',
                cap_DOM_ID: 0,
                capid: 0,
                attributes: [
                    {
                        area: '',
                        application: '',
                        kpi: '',
                        domain: ''
                    }
                ],
                mode: 'off',
                active: false
            };
            capacidades.push(lastCapability);
            return capacidades;
        };

        self.getAppName = function (id, apps) {
            var application = 'Unknown';
            for (var i in apps) {
                if (id === apps[i].id) {
                    application = apps[i].name;
                }
            }
            return application;
        };

        self.getAreaName = function (id, areas) {
            var area = 'Unknown';
            for (var i in areas) {
                if (id === areas[i].area_id) {
                    area = areas[i].area_desc;
                }
            }
            return area;
        };

        self.setAtributosACapacidades = function (atributosCap, apps, areas, dominios, kpis) {
            var atributos = [];

            for (var i in atributosCap) {

                var atributo = {
                    area: atributosCap[i].ar_ID === 0 ? '' : {
                        name: self.getAreaName(atributosCap[i].ar_ID, areas),
                        id: atributosCap[i].ar_ID
                    },
                    application: atributosCap[i].app_ID === 0 ? '' : {
                        name: self.getAppName(atributosCap[i].app_ID, apps),
                        id: atributosCap[i].app_ID
                    },
                    kpi: atributosCap[i].kpi === 0 ? '' : {
                        name: self.getAppName(atributosCap[i].kpi, kpis),
                        id: atributosCap[i].kpi
                    },
                    domain: ''
                };

                atributos.push(atributo);
            }
            return atributos;
        };
        self.setReglasAProcesos = function (reglasPro, apps, areas) {
            var reglas = [];
            console.log(reglasPro);
            for (var i in reglasPro) {
                var regla = {
                    name: reglasPro[i].rules[0].nombre_regla,
                    id_paso: reglasPro[i].rules[0].id_paso,
                    attributes: self.setFlowAReglas(reglasPro[i].rules[0].flow, apps, areas),
                    mode: 'on',
                    active: false
                };
                reglas.push(regla);
            }
            var lastRegla = {
                name: '',
                id_paso: 0,
                attributes: [
                    {
                        area: '',
                        application: '',
                        kpi: '',
                        forma: {
                            id: 'rectangulo',
                            name: 'Process',
                            shape: 1
                        },
                        next_STEP: 0,
                        pros_ID: 0,
                        flow_ID: 0,
                        dia_STEP_ID: 0,
                        diagram_ID: 0
                    }
                ],
                mode: 'off',
                active: false
            };
            reglas.push(lastRegla);
            return reglas;
        };

        self.setFlowAReglas = function (flow, apps, areas) {
            var atributos = [];
            if (flow) {
                var longitud = flow.length;
                if (longitud > 1) {
                    atributos = [
                        {
                            area: {
                                id: flow[0].area_ID,
                                name: self.getAreaName(flow[0].area_ID, areas)
                            },
                            application: {
                                id: flow[0].app_ID,
                                name: self.getAppName(flow[0].app_ID, apps)
                            },
                            kpi: '',
                            forma: {
                                id: 'rombo',
                                name: 'Decision',
                                shape: flow[0].shape_ID
                            },
                            no:{
                                id: flow[1].next_STEP,
                                name: 'Roy Wood'
                            },
                            next_STEP: flow[0].next_STEP,
                            pros_ID: flow[0].pros_ID,
                            flow_ID: flow[0].flow_ID,
                            dia_STEP_ID: flow[0].dia_STEP_ID,
                            diagram_ID: flow[0].diagram_ID
                        }
                    ];
                } else {
                    if (longitud === 0) {
                        atributos = [
                            {
                                area: {
                                    id: flow[0].area_ID,
                                    name: self.getAreaName(flow[0].area_ID, areas)
                                },
                                application: {
                                    id: flow[0].app_ID,
                                    name: self.getAppName(flow[0].app_ID, apps)
                                },
                                kpi: '',
                                forma: {
                                    id: '',
                                    name: 'Process',
                                    shape: 1
                                },
                                next_STEP: 0,
                                pros_ID: 0,
                                flow_ID: 0,
                                dia_STEP_ID: 0,
                                diagram_ID: 0
                            }
                        ];
                    } else {
                        atributos = [
                            {
                                area: flow[0].area_ID || '',
                                application: flow[0].app_ID || '',
                                kpi: '',
                                forma: {
                                    id: flow[0].desc_TYPE || '',
                                    name: 'Process',
                                    shape: flow[0].shape_ID || 1
                                },
                                next_STEP: flow[0].next_STEP || 0,
                                pros_ID: flow[0].pros_ID || 0,
                                flow_ID: flow[0].flow_ID || 0,
                                dia_STEP_ID: flow[0].dia_STEP_ID || 0,
                                diagram_ID: flow[0].diagram_ID || 0
                            }
                        ];
                    }
                }
            } else {
                atributos = [
                    {
                        area: '',
                        application: '',
                        kpi: '',
                        forma: {
                            id: '',
                            name: 'Process',
                            shape: 1
                        },
                        next_STEP: 0,
                        pros_ID: 0,
                        flow_ID: 0,
                        dia_STEP_ID: 0,
                        diagram_ID: 0
                    }
                ];
            }
            return atributos;
        };

    };
    angular.module('mAbc').service('$abcParseLocal', Service);
})();