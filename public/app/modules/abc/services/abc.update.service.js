/* global angular */
(function() {
    var Service = function () {
    	this.update = false;
        this.show = [true,true,true,true,true,true];
        this.obj = {};
    };
    angular.module('mAbc').service('$abcUpdate', Service);
})();