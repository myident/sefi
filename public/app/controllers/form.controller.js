(function(){

	var controller = function($rootScope, $scope, $service, $serviceLogin){
		$scope.toggleContentBool = false; 
		$scope.data = {baseAddress:{}};
		$scope.result = {};
		$scope.backgroundPicture = {};
		$scope.sexList = [
			{id: 'H', name: 'Hombre'},
			{id: 'M', name: 'Mujer'}
	    ];
	    $scope.spin = $rootScope.spin;
		$scope.statesList = [
			{no:'09',id:'DF',		name:'Distrito Federal'},
			{no:'15',id:'MEX.',		name:'Estado de México'},
			{no:'17',id:'MOR',		name:'Morelos'},
			{no:'22',id:'QRO',		name:'Querétaro'},
			{no:'11',id:'GTO',		name:'Guanajuato'},
			{no:'24',id:'S.L.P',	name:'San Luis Potosí'},
			{no:'01',id:'AGS',name:'Aguascalientes'},
		];

		$scope.toggleContent = function(){
			$scope.toggleContentBool = !$scope.toggleContentBool;
			console.log(':)');
		};
		$scope.isToggleContent = function(){
			return $scope.toggleContentBool;
		};

		$scope.readURL = function(input) {
			console.log('up parriba');
	        if (input.files && input.files[0]) {
	        	console.log('up parriba 3');
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $scope.backgroundPicture = {
	                	'background-image' : 'url('+e.target.result +')'
					};
					$scope.$apply();
	            };

	            reader.readAsDataURL(input.files[0]);

	            
	        }
	    };

		$scope.create = function(){
			
			$scope.data.user = $rootScope.getUser();
			$service.build($scope.data)
                .then(function(data) {
                	console.log(data);
                    $scope.result = data;
                    $scope.result.picture = $scope.backgroundPicture;
                    $scope.result.pictureSign = {'background-image':'url(http://myidenti.com'+$scope.result.sign+')'};
                }, function(error) {
                    console.log(error);
                });
		};

		$scope.clear = function(){
			$scope.clearResult();
			$scope.data.name 			= '';
			$scope.data.lastName 		= '';
			$scope.data.sex 			= {id:"",name:""};
			$scope.data.birthdate 		= {day:'',month:'',year:''};
			$scope.data.registerYear	= null;
			$scope.data.old 			= null;
			$scope.data.street 			= '';
			$scope.backgroundPicture 	= { 'background-image' : '' };
		};
		$scope.clearResult = function(){
			$scope.result.curp 			= '';
			$scope.result.folioIFE 		= '';
			$scope.result.folio 		= '';			
			$scope.result.lastName1		= '';
			$scope.result.lastName2 	= '';
			$scope.result.name 			= '';
			$scope.result.address1 		= '';
			$scope.result.address2 		= '';
			$scope.result.address3 		= '';
			$scope.result.registerYear 	= '';
			$scope.result.no 			= '';
			$scope.result.localN 		= '';
			$scope.result.delN 			= '';
			$scope.result.section 		= '';
			$scope.result.old 			= '';
			$scope.result.sex 			= '';
			$scope.result.picture 		= { 'background-image' : '' };
			$scope.result.pictureSign 	= { 'background-image' : '' };
			$scope.result.ID 			= '';
		}
		$scope.clearAll = function(){
			$scope.clear();
			$scope.clearResult();
			$scope.data.baseAddress.state 		=  {no:"",id:"",name:""};
;
			$scope.data.baseAddress.local 		= '';
			$scope.data.baseAddress.del 		= '';
			$scope.data.baseAddress.localN 		= '';
			$scope.data.baseAddress.delN 		= '';
			$scope.data.baseAddress.cp 			= '';
			$scope.data.baseAddress.section 	= '';

		};

		$scope.clearAll();
	};
	controller.$inject = ['$rootScope','$scope','service','serviceLogin'];
	angular.module('app',['http','httpLogin','Components']).controller('FormController',controller);
})();