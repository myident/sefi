/*global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $routeParams) {
        $rootScope.spin = false;
    };

    Controller.$inject = ['$scope', '$rootScope', '$routeParams'];

    angular
        .module('mBusinessArchitecture')
        .controller('ArchitecturesController', Controller);
})();