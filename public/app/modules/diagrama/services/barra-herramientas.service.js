/* global angular */

(function () {

    var service = function () {
        return {
            view: 1,
            organize: 1,
            show: 3,
            zoom: 1
        };
    };
    angular
        .module('mDiagrama')
        .service('$barraHerramientas', service);

})();