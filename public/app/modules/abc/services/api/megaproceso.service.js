(function(){
	angular.module().factory('Megaproceso',function($source, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();