/* global angular */

(function () {

    var service = function () {
        return {
            view: 0,
            organize: true,
            show: 'areas',
            zoom: 1
        };
    };
    angular
        .module('mDiagrama')
        .service('$barraHerramientas', service);

})();