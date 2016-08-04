/* global angular */

(function () {

    var service = function ($rootScope, $arquitecturas, $megaprocesos, $macroprocesos, $procesoskpi) {
        return {
            arquitecturas: function (callback) {
                var arquitecturas = $arquitecturas.get(function (data) {
                    $rootScope.spin = true;
                    callback(data);
                }, function (e) {
                    $rootScope.spin = false;
                    arquitecturas = {};
                    console.log(e);
                });
                return arquitecturas;
            },
            megaprocesos: function (value, callback) {
                $rootScope.spin = true;
                var megaprocesos = $megaprocesos.query({
                    iddominio: value
                }, function () {
                    callback();
                    $rootScope.spin = false;
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
                return megaprocesos;
            },
            macroprocesos: function (value, index, callback) {
                $rootScope.spin = true;
                var macroprocesos = $macroprocesos.query({
                    idmegaproceso: value
                }, function (data) {
                    callback(data);
                    $rootScope.spin = false;
                }, function (e) {
                    console.log(e);
                    $rootScope.spin = false;
                });
                return macroprocesos;
            },
            procesos: function (value, index, callback) {
                $rootScope.spin = true;
                var procesos = $procesoskpi.get({
                    idmacroproceso: value
                }, function (data) {
                    callback(data);
                    $rootScope.spin = false;
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
                return procesos;
            },
            areasList: function(){
                return [
                    {text: 'Customer'},
                    {text: 'Store'},
                    {text: 'Call center'},
                    {text: 'Credit'},
                    {text: 'IT'},
                    {text: 'Fulfillment'},
                ];
            }
        };
    };
    angular
        .module('mDiagrama')
        .service('$indice', service);

})();