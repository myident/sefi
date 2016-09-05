/* global angular */

(function () {

    var service = function () {
        return {
            view: 0,
            organize: 0,
            show: 0,
            zoom: 1,
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