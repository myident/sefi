/* global angular */

(function () {

    var service = function ($paint, $shapes) {
        return {
            build:function(paper, source, show, view){
                var processes,capabilities,sortAreas,labels;
                
                $shapes.svg(paper);

                processes = function (processesList) {
                    var g = paper.group();
                    var fontSizeTitle = 16;
                    var fontSizeLabelCount = 11;

                    for(var i in processesList){
                        var gChild = paper.group();
                        var process = processesList[i];
                        var rect,rectHeader,textBoxHeader,circleHeader,relationshipArrow,relationship,textBoxLabelCount,textBoxCircleHeader;
                        process.html && (function(){
                            var html = process.html;
                            var gCapabilities;
                            rect                = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);
                            rectHeader          = $shapes.factory.rect(html.rectHeader.offset, html.rectHeader.width, html.rectHeader.height);
                            textBoxHeader       = $shapes.factory.textbox(html.textBoxHeader.offset, html.textBoxHeader.width,html.textBoxHeader.height, process.name, fontSizeTitle);
                            circleHeader        = $shapes.factory.circle(html.circleHeader.offset, html.circleHeader.radio);
                            textBoxLabelCount   = $shapes.factory.textbox(html.textBoxLabelCount.offset, html.textBoxLabelCount.width,html.textBoxLabelCount.height, "Process "+(Number(i)+1) +"/"+processesList.length, fontSizeLabelCount);
                            
                            textBoxCircleHeader = $shapes.factory.textbox(html.textBoxCircleHeader.offset, html.textBoxCircleHeader.width,html.textBoxCircleHeader.height, (Number(i)+1)+"", fontSizeTitle);
                            
                            $paint.rectProceso(rect);
                            $paint.rectProcesoHeader(rectHeader);
                            $paint.textLeft(textBoxHeader);
                            $paint.textRight(textBoxLabelCount);
                            $paint.fillGray(textBoxLabelCount);
                            $paint.fillByShow(circleHeader, show);
                            $paint.fillWhite(textBoxCircleHeader);


                            switch(view){
                                case 0: break;
                                case 1: gCapabilities = capabilities(process.capacidades); break;
                                case 2: gCapabilities = capabilities(process.reglas); break;
                                default: break;
                            }
                            //var gCapabilities = (view !== 0) && capabilities(process.capacidades);
                            gChild.append(rect)
                                .append(rectHeader)
                                .append(textBoxHeader)
                                .append(circleHeader)
                                .append(relationshipArrow)
                                .append(relationship)
                                .append(textBoxLabelCount)
                                .append(textBoxCircleHeader)
                                .append(gCapabilities);
                            g.append(gChild);
                        })();

                        //break;
                    }

                    if(view === 2){
                        var ellipse = $shapes.factory.ellipse(source.start.ellipse.offset, source.start.ellipse.width, source.start.ellipse.height, source.start.ellipse.r1, source.start.ellipse.r2);
                        var textbox = $shapes.factory.textbox(source.start.textBox.offset, source.start.textBox.width,source.start.textBox.height, source.start.textBox.text, 14);
                        $shapes.factory.arrow(source.start.arrow[0].offset, source.start.arrow[0].radio, source.start.arrow[0].direction);
                        $shapes.factory.polyline(source.start.line[0].offsets)

                        var ellipse = $shapes.factory.ellipse(source.end.ellipse.offset, source.end.ellipse.width, source.end.ellipse.height, source.start.ellipse.r1, source.start.ellipse.r2);
                        var textbox = $shapes.factory.textbox(source.end.textBox.offset, source.end.textBox.width,source.end.textBox.height, source.start.textBox.text, 14);
                        $shapes.factory.arrow(source.end.arrow[0].offset, source.end.arrow[0].radio, source.end.arrow[0].direction);
                        $shapes.factory.polyline(source.end.line[0].offsets)
                    }
                };
                capabilities = function (capabilitiesList) {

                    var g = paper.group();
                    var fontSizeCapability = 14;
                    for(var i in capabilitiesList){

                        var gChild = paper.group();
                        var capability = capabilitiesList[i];
                        var rect,textbox, arrow, line;

                        capability.html && (function(){

                            var html = capability.html;

                            if(view !== 2){
                                rect = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height);
                            }else{
                                arrow = [];
                                line = [];
                                for(var j in capability.psiguiente){
                                    if(html.arrow[j] !== null){
                                        arrow[j] = $shapes.factory.arrow(html.arrow[j].offset, html.arrow[j].radio, html.arrow[j].direction);
                                        $shapes.factory.polyline(html.line[j].offsets)
                                    }
                                }
                                switch(capability.idfigura){
                                    case 1: rect = $shapes.factory.rect(html.rect.offset, html.rect.width, html.rect.height); break;
                                    case 2: rect = $shapes.factory.rectLines(html.rect.offset, html.rect.width, html.rect.height); break;
                                    case 3: rect = $shapes.factory.rombo(html.rect.offset, html.rect.width, html.rect.height); break;
                                }
                            }
                            
                            textbox       = $shapes.factory.textbox(html.textBox.offset, html.textBox.width,html.textBox.height, capability.name, fontSizeCapability);

                            $paint.rectProceso(rect);

                            gChild.append(rect)
                            .append(textbox);


                            sortAreas(capability.labels,gChild);
                            
                            g.append(gChild);
                            
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
        },
        buildAreas:function(paper, source, height){
            var width = 220;
            var height = 30;
            $shapes.svg(paper);
            var fontSize = 16;
            var rect, textbox, line;
            for(var i in source){
                var area = source[i];

                rect          = $shapes.factory.rect(area.html.rect.offset,area.html.rect.width,area.html.rect.height);
                textbox       = $shapes.factory.textbox(area.html.rect.offset, area.html.rect.width,area.html.rect.height, area.text, fontSize);
                line          = $shapes.factory.line(area.html.line[0],area.html.line[1]);
                $paint.fillAreas(rect);
                $paint.fillWhite(textbox);
            }
        }
    };

};
    angular
        .module('mDiagrama')
        .service('$builder', service);
    
})();