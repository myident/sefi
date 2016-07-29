/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope) {
        $rootScope.spin = false;
    };

    Controller.$inject = ['$scope', '$rootScope'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();