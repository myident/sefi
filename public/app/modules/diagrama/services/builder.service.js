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
                            $paint.fillByShow(circleHeader, show);
                            $paint.fillWhite(textBoxCircleHeader);

                            var gCapabilities = (show !== 0) && capabilities(process.capacidades);
                            g.append(rect)
                                .append(rectHeader)
                                .append(textBoxHeader)
                                .append(circleHeader)
                                .append(relationshipArrow)
                                .append(relationship)
                                .append(textBoxLabelCount)
                                .append(textBoxCircleHeader)
                                .append(gCapabilities);
                        })();

                        
                    }
                    
                };
                capabilities = function (capabilitiesList) {

                    var g = paper.group();
                    var fontSizeCapability = 14;
                    for(var i in capabilitiesList){

                        var capability = capabilitiesList[i];
                        var rect,textbox;

                        capability.html && (function(){

                            var html = capability.html;
                            rect                = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);
                            textBoxHeader       = $shapes.factory.textbox(html.textBox.offset, html.textBox.width,html.textBox.height, capability.name, fontSizeCapability);

                            $paint.rectProceso(rect);

                            (show === 1) && sortAreas(capability.sortAreas.areas,g);
                            (show === 2) && sortAreas(capability.sortAreas.aplicaciones,g);
                            (show === 3) && sortAreas(capability.sortAreas.kpis,g);

                            g.append(rect)
                                .append(textbox);
                        })();
                    }
                    return g;
                };
                sortAreas = function (list, gParent) {
                    var g = paper.group();
                    for(var i in list){
                        var label = list[i];
                        var gLabel = labels(label);
                        g.append(gLabel);
                    }
                    gParent.append(g);
                };
                labels = function (label) {
                    var rect,textbox;
                    var fontSizeLabel = 12;
                    var g = paper.group();
                        label.html && (function(){

                            var html = label.html;
                            rect          = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);
                            textbox       = $shapes.factory.textbox(html.textBox.offset, html.textBox.width,html.textBox.height, label.name, fontSizeLabel);

                            $paint.rectProceso(rect);
                            $paint.fillByShow(rect, show);
                            $paint.fillWhite(textbox);

                            g.append(rect)
                                .append(textbox);
                        })();

                        return g;
                };

                processes(source.procesos);
        }
    };

};
    angular
        .module('mDiagrama')
        .service('$builder', service);
    
})();