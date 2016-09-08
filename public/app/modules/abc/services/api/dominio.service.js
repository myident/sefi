(function(){
	angular.module().factory('Dominio',function($source, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();