/* global angular */

(function () {

    var service = function () {
        return {
            view: 2,
            organize: 1,
            show: 2,
            zoom: 1
        };
    };
    angular
        .module('mDiagrama')
        .service('$barraHerramientas', service);

})();