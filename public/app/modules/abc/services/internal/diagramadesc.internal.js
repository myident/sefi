/* global angular */
(function () {
    var Service = function () {
        var self = this;
        self.getAll = function () {
            return [
  {
    "ldescproc": "Barbaros",
    "desc_diagram": "Account Management",
    "domid": 1,
    "mega_ID": 3,
    "macr_ID": 13,
    "capacidad": [],
    "reglas": [
      {
        "rules": [
          {
            "id_paso": 0,
            "nombre_regla": "All trough nite",
            "flow": [
              {
                "area_ID": 40,
                "next_STEP": 0,
                "desc_TYPE": "YES",
                "pros_ID": 0,
                "flow_ID": 0,
                "shape_ID": 3,
                "dia_STEP_ID": 0,
                "diagram_ID": 0,
                "app_ID": 1
              },
              {
                "area_ID": 40,
                "next_STEP": 0,
                "desc_TYPE": "NO",
                "pros_ID": 0,
                "flow_ID": 0,
                "shape_ID": 3,
                "dia_STEP_ID": 0,
                "diagram_ID": 0,
                "app_ID": 1
              }
            ]
          }
        ]
      },
      {
        "rules": [
          {
            "id_paso": 0,
            "nombre_regla": "Travis Scott",
            "flow": [
              {
                "area_ID": 0,
                "next_STEP": 0,
                "desc_TYPE": " ",
                "pros_ID": 0,
                "flow_ID": 0,
                "shape_ID": 1,
                "dia_STEP_ID": 0,
                "diagram_ID": 0,
                "app_ID": 0
              }
            ]
          }
        ]
      }
    ],
    "pro_ID": 0,
    "diagram_id": 0,
    "cat_PRO": 0
  },
  {
    "ldescproc": "Bebé dragon",
    "desc_diagram": "Account Management",
    "domid": 1,
    "mega_ID": 3,
    "macr_ID": 13,
    "capacidad": [
      {
        "capaldesc": "Ataque aereo de bebe dragon",
        "capid": 0,
        "cap_DOM_ID": 1,
        "atributosCap": [
          {
            "ar_ID": 40,
            "app_ID": 1,
            "kpi": 83
          }
        ]
      }
    ],
    "reglas": [],
    "pro_ID": 0,
    "diagram_id": 0,
    "cat_PRO": 0
  },
  {
    "ldescproc": "P.E.K.K.A.",
    "desc_diagram": "Account Management",
    "domid": 1,
    "mega_ID": 3,
    "macr_ID": 13,
    "capacidad": [
      {
        "capaldesc": "Ataque fuerte de PEKKA",
        "capid": 0,
        "cap_DOM_ID": 1,
        "atributosCap": [
          {
            "ar_ID": 0,
            "app_ID": 0,
            "kpi": 0
          }
        ]
      }
    ],
    "reglas": [],
    "pro_ID": 0,
    "diagram_id": 0,
    "cat_PRO": 0
  },
  {
    "ldescproc": "Principe",
    "desc_diagram": "Account Management",
    "domid": 1,
    "mega_ID": 3,
    "macr_ID": 13,
    "capacidad": [
      {
        "capaldesc": "Ataque corriendo en su caballo de principe",
        "capid": 0,
        "cap_DOM_ID": 1,
        "atributosCap": [
          {
            "ar_ID": 0,
            "app_ID": 0,
            "kpi": 0
          }
        ]
      }
    ],
    "reglas": [],
    "pro_ID": 0,
    "diagram_id": 0,
    "cat_PRO": 0
  }
]
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