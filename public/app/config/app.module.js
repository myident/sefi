/*global angular*/
(function () {

    var angularModules      = ["ngRoute","ngTouch", "ngResource", "ngAnimate"];
    var customModules       = ["mHome", "mProcesses", "mEcosistema", "mAreas", "mBusinessArchitecture","mAdmin"];
    var componentsModules   = ["mHeaderDirective", "mBackground", "Spin","mSlideview","mParagraph"];
    var services            = ["mainService", "mVash", "Singleton", "Arquitecturas", "Dominios", "Megaprocesos", "Macroprocesos", "Procesos","Arquitecturaseco"];

    var modules = angularModules.concat(customModules,componentsModules, services);
    
    angular
        .module('app', modules);

})();