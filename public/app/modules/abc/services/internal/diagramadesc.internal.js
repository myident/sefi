/* global angular */
(function () {
    var Service = function () {
        var self = this;
        self.getAll = function () {
            return [{
        "desc_diagram": "",
        "diagram_id": 0,
        "capacidad": [{
            "atributosCap": [{
                "ar_ID": 40,
                "app_ID": 1,
                "kpi": 78
            }, {
                "ar_ID": 41,
                "app_ID": 2,
                "kpi": 83
            }],
            "cap_DOM_ID": 3,
            "capid": 495,
            "capaldesc": "Ataque con espadas de barbaro"
        }],
        "reglas": [{
            "rules": [{
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }]
        }],
        "ldescproc": "Barbaros",
        "mega_ID": 0,
        "domid": 0,
        "cat_PRO": 181,
        "pro_ID": 322,
        "macr_ID": 123
    }, {
        "desc_diagram": "",
        "diagram_id": 0,
        "capacidad": [{
            "atributosCap": [],
            "cap_DOM_ID": 0,
            "capid": 496,
            "capaldesc": "Ataque aereo de bebe dragon"
        }],
        "reglas": [{
            "rules": [{
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }]
        }],
        "ldescproc": "Bebé dragon",
        "mega_ID": 0,
        "domid": 0,
        "cat_PRO": 182,
        "pro_ID": 323,
        "macr_ID": 123
    }, {
        "desc_diagram": "",
        "diagram_id": 0,
        "capacidad": [{
            "atributosCap": [],
            "cap_DOM_ID": 0,
            "capid": 497,
            "capaldesc": "Ataque fuerte de PEKKA"
        }],
        "reglas": [{
            "rules": [{
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }]
        }],
        "ldescproc": "P.E.K.K.A.",
        "mega_ID": 0,
        "domid": 0,
        "cat_PRO": 183,
        "pro_ID": 324,
        "macr_ID": 123
    }, {
        "desc_diagram": "",
        "diagram_id": 0,
        "capacidad": [{
            "atributosCap": [],
            "cap_DOM_ID": 0,
            "capid": 498,
            "capaldesc": "Ataque corriendo en su caballo de principe"
        }],
        "reglas": [{
            "rules": [{
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }, {
                "id_paso": 0,
                "nombre_regla": null,
                "flow": []
            }]
        }],
        "ldescproc": "Principe",
        "mega_ID": 0,
        "domid": 0,
        "cat_PRO": 184,
        "pro_ID": 325,
        "macr_ID": 123
    }];
        };
        self.getInitial = function () {
            return [
                {
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
                }
            ];
        };
        self.getHoms = function () {
            return [
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
                ];
        };
        self.optionsFiguras = [
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
    };
    angular.module('mAbc').service('$abcdiagramadesc', Service);
})();