/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, Dominio) {
        
        $scope.types = $abcCreate.types;
        
        $scope.toggleType = function (index) {
            for (var i in $scope.types) {
                if (i == index) {
                    $scope.types[index].active = !$scope.types[index].active;
                } else {
                    $scope.types[i].active = false;
                }
            }

        };
        
        $scope.dominio = {
            name: 'Un dominio',
            shortname: 'UND'
        };
        var dominio = new Dominio();
        $scope.print = function(){
            dominio.LNAME = $scope.dominio.name;
            dominio.SNAME = $scope.dominio.shortname;
            
            dominio.$save(function(data){
                console.log(data);
            }, function(e){
                console.log(e);
            });
        };
    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', '$apidominio'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();