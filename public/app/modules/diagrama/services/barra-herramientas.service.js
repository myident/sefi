/* global angular */

(function () {

    var service = function () {
        return {
            showBar: false,
            view: 0,
            organize: 0,
            show: 0,
            zoom: 1,
            nombreMacroproceso: '',
            svgSize: {
                width: 0,
                height: 0
            }
        };
    };
    
    angular
        .module('mDiagrama')
        .service('$barraHerramientas', service);

})();