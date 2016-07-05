/*global angular*/

(function () {
    var Controller = function($scope, $routeParams, $window) {
        
        $scope.go = function() {
            $window.location = '#/areas/arquitectura/areas';  
        };
        
        $scope.descripciones = [
            {
                titulo: 'Business Architecture',
                descripcion: 'Business Architecture defines the strategy, structure and key processes of the organization based on the requirements of the Business areas. BA define the processes that are affected by these requirements, preparing the necessary documents to define the macroprocesses, their applications and their KPI`s .  BA also elaborates detailed processes with business rules and involved applications and areas in order to provide Applications Business area the necessary information to meet the needs of Business Requirements.',
                director: 'Pablo Roberto Torres Tavera',
                puesto: 'Business Architecture Director',
                foto: ''
            },
            {
                titulo: 'Application  & Data Architecture',
                descripcion: 'Application  & Data Architecture Area is responsible of providing a solution for each requirement asked by a business area.  It determines the interactions between the systems and their relationships with the processes designed by the Business Architecture Area in order to fully cover the needs of the business areas.',
                director: 'José Fernando Sánchez Ruiz',
                puesto: 'Application  & Data Architecture Director',
                foto: ''
            },
            {
                titulo: 'Technology Architecture',
                descripcion: 'Information Technology Architecture works in the process of development of methodical information technology specifications, models and guidelines. Information Technology Architecture can also be defined as a high-level map or plan of the information assets in an organization, including the physical design of the building that holds the hardware. Nowadays, Technology Architecture is a key asset to keep the company innovating in order to have a competitive advantage.',
                director: 'Humberto Niño Román',
                puesto: 'Technology Architecture Director',
                foto: ''
            },
            {
                titulo: 'Big Data and Data Science',
                descripcion: 'Big Data and Data Science provide to the organization reliable information for decision making through mathematical and statistical models, with flexible data foundations and using a holistic and agnostic view.',
                director: 'María Eugenia Ayala Porras',
                puesto: 'Big Data and Data Science Director',
                foto: ''
            },
            {
                titulo: 'IT Governance',
                descripcion: 'IT Governance main responsibilities are: To create clarity between business goals and IT Projects, drawing the links between business and project objectives Management of the release plan ,describing graphically the upcoming of the solution initiativesPlanning the IT workforce, ensuring IT have the right number and the right people as collaboratorsVendor Management, managing information related with third parties working with ITMonitoring  the building of IT Enterprise Architecture',
                director: 'Erika Zaragoza Bermeo',
                puesto: 'Governance Assistant Director',
                foto: ''
            },
            {
                titulo: 'Digital Experience',
                descripcion: 'In Digital Experience we build experiences purposefully crafted to fulfill human needs that both enhance and add to the AT&T eco-system. Digital Experience transforms business needs into digital products specifically made for each user. We create and improve existent processes and solutions in order to generate positive experiences and satisfy every user needs.',
                director: 'Franz Carlos',
                puesto: 'Digital Experience Director',
                foto: ''
            }
        ];
        
        $scope.actual = $scope.descripciones[$routeParams.id_area] || $scope.descripciones[0];
    };
    Controller.$inject = ['$scope', '$routeParams', '$window'];
    angular.module('mAreas').controller('GobiernoController', Controller);
})();