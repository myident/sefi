/* global angular */
(function(){
    var service = function(){
        var self = this;
        
        return self;
    };
    
    angular
        .module('mPrint', [])
        .service('$print', service);
})();