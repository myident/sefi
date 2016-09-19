/*global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $routeParams, $itbook, $arquitecturas, $window) {

        $rootScope.spin = false;

        $scope.back = function () {
            $window.history.back();
        };


        $rootScope.source = {
            arquitectura: [
                {
                    name: 'I told You',
                    title: 'Tory Lanez'
                }
            ]
        };
        
        $scope.getArquitecturaIndex = function(index){
            console.log(index);
        };





    };

    Controller.$inject = ['$scope', '$rootScope', '$routeParams', '$itbook', '$arquitecturas', '$window'];

    angular
        .module('mAbc')
        .controller('AbcEditController', Controller);
})();