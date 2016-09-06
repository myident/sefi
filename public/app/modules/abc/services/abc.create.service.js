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
                active: false
            },
            {
                name: 'Megaprocess',
                class: 'mega',
                image: [
                    'assets/img/abc-create/create-megaprocess.png',
                    'assets/img/abc-create/create-megaprocess-active.png'
                ],
                active: false
            },
            {
                name: 'Macroprocess',
                class: 'macro',
                image: [
                    'assets/img/abc-create/create-macroprocess.png',
                    'assets/img/abc-create/create-macroprocess-active.png'
                ],
                active: false
            },
            {
                name: 'Process',
                class: 'process',
                image: [
                    'assets/img/abc-create/create-process.png',
                    'assets/img/abc-create/create-process-active.png'
                ],
                active: false
            },
            {
                name: 'Capability',
                class: 'capability',
                image: [
                    'assets/img/abc-create/create-capability.png',
                    'assets/img/abc-create/create-capability-active.png'
                ],
                active: false
            },
            {
                name: 'Business Rule',
                class: 'business-rule',
                image: [
                    'assets/img/abc-create/create-business-rule.png',
                    'assets/img/abc-create/create-business-rule-active.png'
                ],
                active: false
            },
            {
                name: 'Area',
                class: 'area',
                image: [
                    'assets/img/abc-create/create-area.png',
                    'assets/img/abc-create/create-area-active.png'
                ],
                active: false
            },
            {
                name: 'KPI',
                class: 'kpi',
                image: [
                    'assets/img/abc-create/create-kpi.png',
                    'assets/img/abc-create/create-kpi-active.png'
                ],
                active: false
            },
            {
                name: 'Application',
                class: 'application',
                image: [
                    'assets/img/abc-create/create-application.png',
                    'assets/img/abc-create/create-application-active.png'
                ],
                active: false
            }
        ];
    };
    angular.module('mAbc').service('$abcCreate', Service);
})();