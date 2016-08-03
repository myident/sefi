/* global angular */

(function () {

    var service = function () {
        return {
            update: function (arquitectura, dominio, megaproceso, macroproceso) {
                if (arquitectura && dominio && megaproceso && macroproceso) {
                    return [arquitectura, dominio, megaproceso, macroproceso];
                } else if (arquitectura && dominio && megaproceso) {
                    return [arquitectura, dominio, megaproceso];
                } else if (arquitectura && dominio) {
                    return [arquitectura, dominio];
                } else if (arquitectura) {
                    return [arquitectura];
                } else {
                    return [];
                }
            }
        };
    };
    angular
        .module('mDiagrama')
        .service('$historial', service);

})();