(function(){

	var controller = function($scope){

		 $scope.sexList = [
		      {id: 'H', name: 'Hombre'},
		      {id: 'M', name: 'Mujer'},
		    ];

 $scope.statesList = [
				{no:'09',id:'DF',name:'Distrito Federal'},
				{no:'15',id:'MC',name:'Estado de México'},
				{no:'17',id:'MS',name:'Morelos'},
				{no:'22',id:'QT',name:'Querétaro'},
				{no:'11',id:'GT',name:'Guanajuato'},
				{no:'24',id:'SP',name:'San Luis Potosí'}
			];
		 // $scope.statesList = [
			// 	{no:'01',id:'AS',name:'Aguascalientes'},
			// 	{no:'02',id:'BC',name:'Baja California Norte'},
			// 	{no:'03',id:'BS',name:'Baja California Sur'},
			// 	{no:'04',id:'CC',name:'Campeche'},
			// 	{no:'05',id:'CS',name:'Chiapas'},
			// 	{no:'06',id:'CH',name:'Chihuahua'},
			// 	{no:'07',id:'CL',name:'Coahuila'},
			// 	{no:'08',id:'CM',name:'Colima'},
			// 	{no:'09',id:'DF',name:'Distrito Federal'},
			// 	{no:'10',id:'DG',name:'Durango'},
			// 	{no:'11',id:'GT',name:'Guanajuato'},
			// 	{no:'12',id:'GR',name:'Guerrero'},
			// 	{no:'13',id:'HG',name:'Hidalgo'},
			// 	{no:'14',id:'JC',name:'Jalisco'},
			// 	{no:'15',id:'MC',name:'México - Estado de'},
			// 	{no:'16',id:'MN',name:'Michoacán'},
			// 	{no:'17',id:'MS',name:'Morelos'},
			// 	{no:'18',id:'NT',name:'Nayarit'},
			// 	{no:'19',id:'NL',name:'Nuevo León'},
			// 	{no:'20',id:'OC',name:'Oaxaca'},
			// 	{no:'21',id:'PL',name:'Puebla'},
			// 	{no:'22',id:'QT',name:'Querétaro'},
			// 	{no:'23',id:'QR',name:'Quintana Roo'},
			// 	{no:'24',id:'SP',name:'San Luis Potosí'},
			// 	{no:'25',id:'SL',name:'Sinaloa'},
			// 	{no:'26',id:'SR',name:'Sonora'},
			// 	{no:'27',id:'TC',name:'Tabasco'},
			// 	{no:'28',id:'TS',name:'Tamaulipas'},
			// 	{no:'29',id:'TL',name:'Tlaxcala'},
			// 	{no:'30',id:'VZ',name:'Veracruz'},
			// 	{no:'31',id:'YN',name:'Yucatán'},
			// 	{no:'32',id:'ZS',name:'Zacatecas'},
			// 	{no:'33',id:'SM',name:'Serv. Exterior Mexicano'},
			// 	{no:'34',id:'NE',name:'Extranjero'}
			// ];


		$scope.create = function(){
			$scope.prepareString();

			$scope.curp 	= $scope.getCURP();
			$scope.folioIFE = $scope.getFolioIFE();
			$scope.folio 	= $scope.getFolio();
			$scope.ID 		= $scope.getID();
		};

		$scope.prepareString = function(){
			
			$scope.nameUp = $scope.name.toUpperCase();
			$scope.lastNameUp = $scope.lastName.toUpperCase();

			$scope.lastNameUp = $scope.lastNameUp.trim()
		    var n = $scope.lastNameUp.indexOf(" ");
		    $scope.lastName1 = $scope.lastNameUp.substring(0,n)
		    $scope.lastName2 = $scope.lastNameUp.substring(n+1,$scope.lastNameUp.length)

		};

		$scope.clean = function(){
			$scope.name = '';
			$scope.lastName = '';
			$scope.section = '';
			$scope.sex = {id: '', name: ''};
			$scope.birthdate = {day:'',month:'',year:''};
			$scope.state = { id : '', name:''};

			$scope.curp = '';
			$scope.folioIFE = '';
			$scope.folio = '';
		};

		$scope.getCURP = function(){
			var curp = "";
	
			curp += $scope.lastName1.substring(0,1);
			curp += $scope.getSecondVoc($scope.lastName1)
			curp += $scope.lastName2.substring(0,1);
			curp += $scope.name.substring(0,1);
			curp += $scope.birthdate.year;
			curp += $scope.birthdate.month;
			curp += $scope.birthdate.day;
			curp += JSON.parse($scope.sex).id;
			curp += JSON.parse($scope.state).id;
			curp += $scope.getSecondCons($scope.lastName1);
			curp += $scope.getSecondCons($scope.lastName2);
			curp += $scope.getSecondCons($scope.nameUp);
			curp += "0"+ Math.floor((Math.random() * 9) + 1);

			return curp.toUpperCase();
		};

		$scope.getFolioIFE = function(){
			var folioIFE = "";

			folioIFE += $scope.lastName1.substring(0,1);
			folioIFE += $scope.lastName1.substring(2,3);
			folioIFE += $scope.lastName2.substring(0,1);
			folioIFE += $scope.lastName2.substring(2,3);
			folioIFE += $scope.name.substring(0,1);
			folioIFE += $scope.name.substring(2,3);
			folioIFE += $scope.birthdate.year;
			folioIFE += $scope.birthdate.month;
			folioIFE += $scope.birthdate.day;
			folioIFE += JSON.parse($scope.state).no;
			folioIFE += JSON.parse($scope.sex).id;
			folioIFE += Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1);

			return folioIFE.toUpperCase();
		};

		$scope.getFolio = function(){
			var folio = "";
			folio += "000" +
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1) + ""+
						Math.floor((Math.random() * 9) + 1);

						return folio;
		};

		$scope.getID = function(){
			var id = $scope.section;
			var sectionLength = 13 - $scope.section.length;

			for(var i = 0; i < sectionLength; i++){
				id += Math.floor((Math.random() * 9) + 1);
			}
			
			return id;
		};

		$scope.getSecondCons = function(word){
			var wordLength = word.length;

			for(var i = 1; i < wordLength; i++){
				var character = word.substring(i, (i + 1));
				if(character != 'A' && character != 'E' && character != 'I' && character != 'O' && character != 'U' ){
					return character;
				}
			}
			return 'ERROR: Appellido Invalido';
		};


		$scope.getSecondVoc = function(word){
			var wordLength = word.length;

			for(var i = 1; i < wordLength; i++){
				var character = word.substring(i, (i + 1));
				if(character == 'A' || character == 'E' || character == 'I' || character == 'O' || character == 'U' ){
					return character;
				}
			}
			return 'ERROR: Appellido Invalido';
		};


		$scope.clean();
	};



	controller.$inject = ['$scope'];
	angular.module('generatorApp',[]).controller('ifesController',controller);
})();