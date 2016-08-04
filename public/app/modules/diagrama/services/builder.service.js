/* global angular */

(function () {

    var service = function ($paint, $shapes) {
        return {
            build:function(paper, source, show){
                var processes,capabilities,sortAreas,labels;
                
                $shapes.svg(paper);

                processes = function (processesList) {
                    var g = paper.group();
                    var fontSizeTitle = 16;
                    var fontSizeLabelCount = 11;
                    for(var i in processesList){
                        var process = processesList[i];
                        var rect,rectHeader,textBoxHeader,circleHeader,relationshipArrow,relationship,textBoxLabelCount,textBoxCircleHeader;
                        process.html && (function(){
                            var html = process.html;
                            rect                = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);
                            rectHeader          = $shapes.factory.rect(html.rectHeader.offset, html.rectHeader.width, html.rectHeader.height);
                            textBoxHeader       = $shapes.factory.textbox(html.textBoxHeader.offset, html.textBoxHeader.width,html.textBoxHeader.height, process.name, fontSizeTitle);
                            textBoxLabelCount   = $shapes.factory.textbox(html.textBoxLabelCount.offset, html.textBoxLabelCount.width,html.textBoxLabelCount.height, "Process "+(Number(i)+1) +"/"+processesList.length, fontSizeLabelCount);
                            circleHeader        = $shapes.factory.circle(html.circleHeader.offset, html.circleHeader.radio);
                            textBoxCircleHeader = $shapes.factory.textbox(html.textBoxCircleHeader.offset, html.textBoxCircleHeader.width,html.textBoxCircleHeader.height, (Number(i)+1)+"", fontSizeTitle);
                            
                            $paint.rectProceso(rect);
                            $paint.rectProcesoHeader(rectHeader);
                            $paint.textLeft(textBoxHeader);
                            $paint.textRight(textBoxLabelCount)
                            $paint.fillGray(textBoxLabelCount);
                            $paint.fillView(circleHeader, show);
                            $paint.fillWhite(textBoxCircleHeader);

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