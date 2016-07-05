/*global angular*/

(function () {
    var Controller = function($scope, $routeParams, $window) {
        $scope.go = function() {
            $window.location = '#/areas/arquitectura/areas';  
        };
        
        $scope.descripciones = [
            {
                titulo: 'Governance',
                descripcion: 'IT Governance main responsibilities are: To create clarity between business goals and IT Projects, drawing the links between business and project objectives Management of the release plan ,describing graphically the upcoming of the solution initiativesPlanning the IT workforce, ensuring IT have the right number and the right people as collaboratorsVendor Management, managing information related with third parties working with ITMonitoring  the building of IT Enterprise Architecture',
                director: 'Erika Zaragoza Bermeo',
                puesto: 'Governance Assistant Director',
                foto: ''
            }
        ];
        
        $scope.actual = $scope.descripciones[$routeParams.id_area] || $scope.descripciones[0];
    };
    Controller.$inject = ['$scope', '$routeParams', '$window'];
    angular.module('mAreas').controller('GobiernoController', Controller);
})();