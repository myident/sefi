/*global angular*/
(function () {

    var controller = function ($scope, $rootScope, $routeParams, $home) {
    	// $scope.user = new Entry();
    	// $scope.user.name = 'Martin';
    	// $scope.user.apellido = 'Mtz';
    	// $scope.user.$save(function(data){
    		
    	// },function(err){

    	// });

        $scope.home = {
            "article":{
                    "title":"Hello!",
                    "body":"I am proud to introduce to all IT Collaborators and Business Users areas this new tool, which has been redesigned to consult, save and update, in an easier way, the IT documentation that  is generated during planning, design and development of the requirements requested to IT from the Business Areas of AT&T Mexico. \\n \\n This tool will provide you an overview of our Enterprise Architecture, and its main objective is to keep the information allways available and updated. Everyone is invited to be part of its ongoing improvement.",
                    "author":"Pablo Salazar",
                    "job":"VP IT / Chief Information Officer"
                    },
            "vision":"To design and create in this decade the new global network, processes, and service platforms that maximize automation, allowing for a reallocation of human resources to more complex and productive work.",
            "mission":"Our mission is to exploit technical innovations for the benefit of AT&T and its customers by implementing next-generation technologies and network advancements in AT&T's services and operations.",
            "values":["Ethics","Ethics", "Honor your Word","Honesty","Respect","Family","Discipline"],
            "other":" “Connecting \\n people, \\n processes \\n​ and things.” "
        };
        
    };
    controller.$inject = ['$scope','$rootScope','$routeParams','$home'];
    angular.module('mHome').controller('HomeController', controller);

})();