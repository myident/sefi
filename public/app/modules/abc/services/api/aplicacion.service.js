(function(){
	angular.module().factory('Aplicacion',function($source, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();