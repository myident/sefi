/*global angular*/
(function () {

    var angularModules      = ["ngRoute","ngTouch", "ngResource", "ngAnimate"];
    var customModules       = ["mHome", "mProcesses", "mEcosistema", "mAreas"];
    var componentsModules   = ["mHeaderDirective", "mBackground", "Spin"];
    var services            = ["mainService", "mVash"];

    var modules = angularModules.concat(customModules,componentsModules, services);
    
    angular
        .module('app', modules);

})();