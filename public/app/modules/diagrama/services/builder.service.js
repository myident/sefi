/* global angular */

(function () {

    var service = function ($paint, $shapes) {
        return {
            build:function(paper, source){
                var processes,capabilities,sortAreas,labels;
                $shapes.svg(paper);
                
                processes = function (processesList) {
                    var g = paper.group();
                    for(var i in processesList){
                        var process = processesList[i];
                        var rect;
                        process.html && (function(){
                            var html = process.html;
                            rect = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);


                            //(view !== 0) && capabilities(process);
                            g.append(rect);
                        })();

                        
                    }
                    
                };
                capabilities = function (source, view, organiceBy, show) {

                    
                };
                sortAreas = function (source, view, organiceBy, show) {

                    
                };
                labels = function (source, view, organiceBy, show) {

                    
                };

                processes(source.processes);
        }
    };

};
    angular
        .module('mDiagrama')
        .service('$builder', service);
    
})();