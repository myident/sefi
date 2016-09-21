/* global angular */
(function () {
    var Service = function () {
        this.types = [
            {
                name: 'Domain',
                class: 'domain',
                image: [
                    'assets/img/abc-create/create-domain.png',
                    'assets/img/abc-create/create-domain-active.png'
                ],
                active: true,
//                source: {
//                    name: 'Dominio',
//                    shortname: 'Large Dominio'
//                }
            },
            {
                name: 'Megaprocess',
                class: 'mega',
                image: [
                    'assets/img/abc-create/create-megaprocess.png',
                    'assets/img/abc-create/create-megaprocess-active.png'
                ],
                active: false,
//                source: {
//                    domain: {
//                        name: 'IT',
//                        id: 1
//                    },
//                    name: 'Megaproceso'
//                }
            },
            {
                name: 'Macroprocess',
                class: 'macro',
                image: [
                    'assets/img/abc-create/create-macroprocess.png',
                    'assets/img/abc-create/create-macroprocess-active.png'
                ],
                active: false,
//                source: {
//                    mega_id: 0,
//                    macro_id: 0,
//                    nombre_Macro: 'Shi',
//                    version_autor: 'Alan Olvera',
//                    version_vers: '',
//                    version_desc: '',
//                    objetivo_Macro: '',
//                    scope_Macro: '',
//                    security_Macro: '',
//                    operation_system_Macro: '',
//
//
//                    attach: [],
//                    operative: [],
//                    process_change: [],
//                    SLA_service: [],
//                    glosary: [],
//                    assumtion: [],
//                    non_funtionals: [{
//                        mcro: 0,
//                        req_ID: 0,
//                        des_REQ: '',
//                        status: 0
//                    }],
//                    asosiate_buss: [],
//                    process_owner: []
//                }
            },
            {
                name: 'Area',
                class: 'area',
                image: [
                    'assets/img/abc-create/create-area.png',
                    'assets/img/abc-create/create-area-active.png'
                ],
                active: false,
//                source: {
//                    name: 'Area',
//                    type: 1
//                }
            },
            {
                name: 'KPI',
                class: 'kpi',
                image: [
                    'assets/img/abc-create/create-kpi.png',
                    'assets/img/abc-create/create-kpi-active.png'
                ],
                active: false,
//                source: {
//                    name: 'KPI',
//                    shortname: 'K P I',
//                    type: 1
//
//                }
            }
        ];


        this.typesEmpty = [
            {
                id:0,
                name: 'Domain',
                class: 'domain',
                image: [
                    'assets/img/abc-create/create-domain.png',
                    'assets/img/abc-create/create-domain-active.png'
                ],
                active: true,
               source: {
                   name: '',
                   shortname: ''
               }
            },
            {
                id:0,
                name: 'Megaprocess',
                class: 'mega',
                image: [
                    'assets/img/abc-create/create-megaprocess.png',
                    'assets/img/abc-create/create-megaprocess-active.png'
                ],
                active: false,
               source: {
                   domain: undefined,
                   name: ''
               }
            },
            {
                id:0,
                name: 'Macroprocess',
                class: 'macro',
                image: [
                    'assets/img/abc-create/create-macroprocess.png',
                    'assets/img/abc-create/create-macroprocess-active.png'
                ],
                active: false,
               source: {
                   id:0,
                   mega_id: 0,
                   macro_id: 0,
                   nombre_Macro: '',
                   version_autor: '',
                   version_vers: '',
                   version_desc: '',
                   objetivo_Macro: '',
                   scope_Macro: '',
                   security_Macro: '',
                   operation_system_Macro: '',
                   process_Owner: [],

                   attach: [],
                   operative: [],
                   process_change: [],
                   SLA_service: [],
                   glosary: [],
                   assumtion: [],
                   non_funtionals: [{
                       mcro: 0,
                       req_ID: 0,
                       des_REQ: '',
                       status: 0
                   }],
                   asosiate_buss: []
               }
            },
            {
                id:0,
                name: 'Area',
                class: 'area',
                image: [
                    'assets/img/abc-create/create-area.png',
                    'assets/img/abc-create/create-area-active.png'
                ],
                active: false,
               source: {
                   name: '',
                   type: 0
               }
            },
            {
                id:0,
                name: 'KPI',
                class: 'kpi',
                image: [
                    'assets/img/abc-create/create-kpi.png',
                    'assets/img/abc-create/create-kpi-active.png'
                ],
                active: false,
               source: {
                   name: '',
                   shortname: '',
                   type: 0

               }
            }
        ];
    };
    angular.module('mAbc').service('$abcCreate', Service);
})();