/*global angular*/
(function () {

    var angularModules = ["ngRoute", "ngTouch", "ngResource", "ngAnimate", "angular-parallax", "ngFileUpload"];

    var customModules = ["mHome", "mProcesses", "mEcosistema", "mAdmin", "mArchitecture", "mAbc"];

    var componentsModules = ["mHeaderDirective", "mBackground", "Spin", "mSlideview", "mParagraph", "mGetdimensions", "mDiagrama"];

    var services = ["mainService", "mVash", "Singleton", "Arquitecturas", "Dominios", "Megaprocesos", "Macroprocesos", "Procesos", "Arquitecturaseco", "mPrint", "wordService"];

    var directives = ["abcInput", "abcTextarea", "abcSelect", "abcDomain", "abcApplication", "abcArea", "abcBrule", "abcCapability", "abcKpi", "abcMacroprocess", "abcProcess", "abcMegaprocess", "abcTextareaXl", "abcAddInputDouble", "abcAddInputXl", "abcAddInputMultiple", "abcAddNumericInput", "abcAddInputFile", "abcAddSelect", "abcRadio", "abcAddSelectObj"];

    var modules = angularModules.concat(customModules, componentsModules, services, directives);

    angular
        .module('app', modules);

})();