/* global angular, Snap */

Snap.plugin(function (Snap, Element, Paper) {
    Paper.prototype.multitext = function (x, y, txt, max_width, attributes) {

        var svg = Snap();
        var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var temp = svg.text(0, 0, abc);
        temp.attr(attributes);
        var letter_width = temp.getBBox().width / abc.length;
        svg.remove();

        var words = txt.split(" ");
        var width_so_far = 0,
            current_line = 0,
            lines = [''];
        for (var i = 0; i < words.length; i++) {

            var l = words[i].length;
            if (width_so_far + (l * letter_width) > max_width) {
                lines.push('');
                current_line++;
                width_so_far = 0;
            }
            width_so_far += l * letter_width;
            lines[current_line] += words[i] + " ";
        }

        var t = this.text(x, y, lines).attr(attributes);
        t.selectAll("tspan:nth-child(n+2)").attr({
            dy: "1.2em",
            x: x
        });
        return t;
    };
});

(function () {
    var Directive = function ($vash, $paint, $shapes) {
        var Link = function (scope, element, attrs, ngModel) {
            
            scope.sizes = [
                {
                    width: 5000,
                    height: 6000
                },
                {
                    width: 2000,
                    height: 6660
                },
                {
                    width: 10200,
                    height: 6000
                }
            ];

            scope.svg = Snap(element[0]);
            scope.width = scope.sizes[scope.layout].width;
            scope.height = scope.sizes[scope.layout].height;
            
            // Se configura el scope svg en $shapes
            $shapes.svg(scope.svg);
            // este factory crea cada una de las formas
            scope.$factory = $shapes.factory;
            // este service se encarga de decorar las formas
            scope.$paint = $paint;
            
            // Configura los procesos, agrega atributos de cada uno
            scope.settingProcesos = function (procesos) {
                var offsets = [{
                    x: 0,
                    y: 200
                }, {
                    x: 0,
                    y: 220
                }, {
                    x: 150,
                    y: 200
                }];
                var offsetsProcesos = [{
                    x: 0,
                    y: 200
                }, {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: 0
                }];
                for (var i in procesos) {
                    var proceso = procesos[i];
                    for (var j in procesos[i][scope.type]) {
                        var capacidad = procesos[i][scope.type][j];
                        capacidad.offsets = [{
                            x: 0,
                            y: 0
                        }, {
                            x: 0,
                            y: 0
                        }, {
                            x: 0,
                            y: 0
                        }];
                        offsets[0].x = scope.config.layouts.initial[i].offset.x;
                        offsets[0].y = offsets[0].y;
                        offsets[1].x = $vash.findOffsetInArray(scope.config.layouts.vertical, capacidad, 'areas').x;
                        offsets[1].y = offsets[1].y;
                        offsets[2].y = $vash.findOffsetInArray(scope.config.layouts.horizontal, capacidad, 'aplicaciones').y + 40;
                        capacidad.offsets = JSON.parse(JSON.stringify(offsets));
                        // offsets capacidad
                        offsets[0].y += 100; //Modifica las flechas
                        offsets[1].y += 100;
                        offsets[2].x += 230;
                    }
                    offsets[0].y = 200;
                    offsets[1].y += 170;
                    proceso.offsets = JSON.parse(JSON.stringify(offsetsProcesos));
                    proceso = $vash.settingDimensionsToProcess(proceso,true, scope.layout, scope.type);
                    proceso.offsets[0] = scope.config.layouts.initial[i].offset;
                    proceso.offsets[0].y = 45 + (proceso.height[0]/2); 
                }
            };
            // Crea el Layout 1
            scope.buildLayoutInitial = function () {
                var offset = {
                    x: 200,
                    y: 200
                };
                var width = 210; // ancho de las filas 
                scope.config.layouts.initial = [];
                scope.layoutHorizontalGroup = scope.svg.group();
                for (var i in scope.source) {
                    scope.config.layouts.initial[i] = {};
                    scope.config.layouts.initial[i].offset = JSON.parse(JSON.stringify(offset));
                    offset.x += width;
                }
            };
            // Crea el Layout 3
            scope.buildLayoutHorizontal = function () {
                var height = 220;
                var width = 50;
                var offset = {
                    x: 0,
                    y: height/2
                };
                scope.layoutHorizontalGroup = scope.svg.group();
                for (i in scope.config.layouts.horizontal) {
                    var rect, line, text;
                    line = scope.$factory.line({
                        x: offset.x,
                        y: offset.y + ((height/2) - 1)
                    }, {
                        x: scope.sizes[2].width,
                        y: offset.y + ((height/2) - 1)
                    });
                    line = scope.$paint.lineApplication(line);
                    var g = scope.svg.group(line);
                    scope.layoutHorizontalGroup.append(g);
                    scope.config.layouts.horizontal[i].offset = JSON.parse(JSON.stringify(offset));;
                    offset.y += height;
                }
            };
            
            // Crear el Layout 2
            scope.buildLayoutVertical = function () {
                var height = 30;
                var width = 264;
                var offset = {
                    x: (width / 2),
                    y: (height / 2)
                };

                scope.layoutVerticalGroup = scope.svg.group();
                for (i in scope.config.layouts.vertical) {
                    var rect, line, text;
                    // rect = scope.$factory.rect(offset, width, height);
                    // rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory.line({
                        x: offset.x + (width / 2),
                        y: offset.y - (height / 2)
                    }, {
                        x: offset.x + (width / 2),
                        y: scope.sizes[1].height
                    });
                    line = scope.$paint.lineApplication(line);
                    // text = scope.$factory.textbox(offset, width - 40, height, scope.config.layouts.vertical[i].text, 16);
                    // text = scope.$paint.textAreas(text);

                    // var g = scope.svg.group(rect, line, text);
                    var g = scope.svg.group(line);
                    scope.layoutVerticalGroup.append(g);

                    var offsetCopy = JSON.parse(JSON.stringify(offset));
                    //offsetCopy.x = offsetCopy.x + (width/2);
                    scope.config.layouts.vertical[i].offset = offsetCopy;
                    offset.x += width;
                }
            };
            
            // Cambia los Layouts
            scope.config.changeLayoutSelect = function (layoutSelect) {
                scope.layoutVerticalGroup.attr({
                    visibility: "hidden"
                });
                scope.layoutHorizontalGroup.attr({
                    visibility: "hidden"
                });
                switch (layoutSelect) {
                case 0:
                    break;
                case 1:
                    scope.layoutVerticalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                case 2:
                    scope.layoutHorizontalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                default:
                    break;
                }
            };
            
            // Construye el diagrama de la Subcapacidad
            scope.buildSubCapacidad = function (subcapacidades, subcapacidad, offset, last) {

                var subCapacidadGroup = scope.svg.group();
                var arr = [offset.x,offset.y,offset.x,offset.y+50];
                switch (subcapacidad.type) {
                case 'activity':
                    var activity,text,line, arrow;
                    if(last){
                        line = scope.$factory.polyline(arr);
                        //line = scope.$paint.fillWhite(line);
                        arrow = scope.$factory.arrow({x:arr[2],y:arr[3] - 3}, 12);
                        //arrow = scope.$paint.fillWhite(arrow);
                    }
                    activity = scope.$factory.rect(offset, 110, 80);
                    activity = scope.$paint.rectCapacidades(activity);
                    text = scope.$factory.textbox(offset, 100, 80, subcapacidad.text, 11);
                    subCapacidadGroup.append(arrow).append(line).append(activity).append(text);
                    activity.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    text.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    break;
                case 'if':
                    var rombo, text, line, lineElse ,arrow, arrowElse;
                    rombo = scope.$factory.rombo(offset, 110, 80);
                    text = scope.$factory.textbox(offset, 80, 80, subcapacidad.text, 10);
                    subCapacidadGroup.append(activity, text);
                    line = scope.$factory.polyline(arr);

                    // HARDCODE
                    var arr2 = [offset.x,offset.y, offset.x+70,offset.y, offset.x+70, offset.y - 200, offset.x+65, offset.y - 200, offset.x+70, offset.y - 200, offset.x+70,offset.y, offset.x,offset.y];
                    lineElse = scope.$factory.polyline(arr2);
                    //lineElse = scope.$paint.fillWhite(lineElse);
                    arrow = scope.$factory.arrow({x:arr[2],y:arr[3] }, 12);
                    //arrow = scope.$paint.fillWhite(arrow);
                    arrowElse = scope.$factory.arrow({x:offset.x+60, y:offset.y - 206}, 12);
                    //arrowElse = scope.$paint.fillWhite(arrowElse);
                    arrowElse.attr({
                        transform: "r90"
                    });

                    subCapacidadGroup.append(arrow).append(line).append(lineElse).append(arrowElse).append(rombo).append(text);
                    rombo.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    text.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    break;
                case 'end':
                    var circle, textboxCircle;
                    circle = scope.$factory.circle(offset, 15);
                    circle = scope.$paint.circleEnd(circle);
                    textboxCircle = scope.$factory.textbox(offset, 30, 30, subcapacidad.text, 18);
                    textboxCircle = scope.$paint.fontColorWhite(textboxCircle);
                    subCapacidadGroup.append(circle).append(textboxCircle);
                    circle.data('offsets',[offset,offset,offset]).data('radio',[15,15,15]);
                    textboxCircle.data('offsets',[offset,offset,offset]).data('width',[30,30,30]).data('height',[30,30,30]);
                    break;
                default:
                    break;

                }
                return subCapacidadGroup;
            };
            
            // Construye las subcapacidades de cada capacidad
            scope.buildSubCapacidades = function (subcapacidades, offset) {

                var offsetSubcapacidad = JSON.parse(JSON.stringify(offset));
                var capacidadGroup = scope.svg.group();
                offsetSubcapacidad = {
                    x: offset.x,
                    y: (offset.y + 100)
                };

                var offsetBack = JSON.parse(JSON.stringify(offset));
                offsetBack.y += 40;
                var back = scope.$factory.rect(offsetBack, 150, 0);
                var backMask = scope.$factory.rect(offsetBack, 150, 0);

                back = scope.$paint.rectCapacidadesBack(back);
                capacidadGroup.append(back);
                capacidadGroup.attr({
                    mask: backMask
                });


                for (var i in subcapacidades) {
                    var last = (Number(i)+1) == subcapacidades.length ? false : true;
                    var g = scope.buildSubCapacidad(subcapacidades, subcapacidades[i], offsetSubcapacidad, last);
                    subcapacidades.offsets = [];
                    subcapacidades.offsets[1] = offsetSubcapacidad;
                    capacidadGroup.append(g);
                    offsetSubcapacidad.y += 100;
                }

                var height = 120;
                //back.attr({"height":height + "px"});
                backMask.attr({
                    "fill": "silver"
                });
                back.attr({
                    "height": height + "px"
                });

                if (subcapacidades.length > 1) {
                    height = (offsetSubcapacidad.y) - offsetBack.y - 150;
                    back.attr({
                        "height": height + "px"
                    });
                }

                // Setting Data
                back.data('offsets',[offset,offset,offset]).data('width',[150,150,150]).data('height',[height,height,height]);

                // backMask.animate({height: 0}, 10000);

                var obj = {
                    g: capacidadGroup,
                    height: height,
                    backMask: backMask
                };
                return obj;
            };

            // Construye la capacidad
            scope.buildCapacidad = function (capacidad, i, j) {
                var capacidadWidth = 120;
                var capacidadHeight = 60;
                var rect, textbox, rectFooterOffset, intersection, arrow, rectHover, rectTrasparent;

                var capacidadMainGroup = scope.svg.group();
                var capacidadGroup = scope.svg.group();

                var node = scope.svg.group();
                if ((Number(j) + 1) < scope.source[i][scope.type].length) {
                    capacidad = $vash.intersectionFill(capacidad, scope.source[i][scope.type][(Number(j) + 1)], true);

                    
                    var intersections = [];
                        intersections[0] = JSON.parse(JSON.stringify(capacidad.intersection[0]));
                        intersections[1] = JSON.parse(JSON.stringify(capacidad.intersection[1]));
                        intersections[2] = JSON.parse(JSON.stringify(capacidad.intersection[2]));

                    intersections[0][2].y = intersections[0][2].y - (capacidadHeight / 2) - 15;
                    intersections[1][2].y = intersections[1][2].y - (capacidadHeight / 2) - 15;

                    var arr =  [
                            intersections[scope.layout][0].x, 
                            intersections[scope.layout][0].y, 
                            intersections[scope.layout][1].x, 
                            intersections[scope.layout][1].y, 
                            intersections[scope.layout][2].x, 
                            intersections[scope.layout][2].y, 
                            intersections[scope.layout][1].x, 
                            intersections[scope.layout][1].y, 
                            intersections[scope.layout][0].x, 
                            intersections[scope.layout][0].y
                        ];

                    intersection = scope.$factory.polyline(arr);
                        
                    var baseArrow = 12;
                        var offsetsArrow = [
                            intersections[0][2],
                            intersections[1][2],
                            intersections[2][2]
                        ];
                    offsetsArrow[2].y -=6;
                    arrow = scope.$factory.arrow(offsetsArrow[scope.layout], baseArrow);
                    if(scope.layout == 2){
                            scope.$paint.rotate90(arrow);
                        }

                    // set intersections and offsets
                    intersection.data('intersections',intersections);
                    arrow.data('offsets',offsetsArrow).data('base',baseArrow);

                    node.append(intersection).append(arrow);
                    capacidadGroup.append(node);
                }

                

                rect = scope.$factory.rect(capacidad.offsets[scope.layout], capacidadWidth, capacidadHeight);
                rect = scope.$paint.rectCapacidades(rect);
                

                textbox = scope.$factory.textbox(capacidad.offsets[scope.layout], capacidadWidth, capacidadHeight, capacidad.name, 12);

                rectFooterOffset = [];
                rectFooterOffset[0]    = {x:capacidad.offsets[0].x, y : capacidad.offsets[0].y + ((capacidadHeight/2)-10)};
                rectFooterOffset[1]    = {x:capacidad.offsets[1].x, y : capacidad.offsets[1].y + ((capacidadHeight/2)-10)};
                rectFooterOffset[2]    = {x:capacidad.offsets[2].x, y : capacidad.offsets[2].y + ((capacidadHeight/2)-10)};

                // Setting data
                rect.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);
                textbox.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);

                // capacidadGroup.append(rect).append(textbox).append(rectFooter).append(textboxFooter);
                capacidadGroup.append(rect).append(textbox);
                capacidadMainGroup.append(capacidadGroup);
                var obj = {};

                if (capacidad.subcapacidades.length) {
                    
                    rectHover = scope.$factory.rect(capacidad.offsets[scope.layout], capacidadWidth, capacidadHeight);
                    rectHover = scope.$paint.rectCapacidadesHover(rectHover);
                    rectHover.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);

                    var cornerOffset = JSON.parse(JSON.stringify(capacidad.offsets[scope.layout]));
                    cornerOffset.x +=(capacidadWidth/2);
                    cornerOffset.y +=(capacidadHeight/2) - 12;
                    var corner = scope.$factory.corner(cornerOffset, 12);
                    corner = scope.$paint.corner(corner);
                    corner.data('offsets',[cornerOffset,cornerOffset,cornerOffset]);

                    var img = scope.$factory.img(capacidad.offsets[scope.layout],'app/modules/processes/assets/img/icono-mas.svg', capacidadWidth, capacidadHeight);
                    img = scope.$paint.hide(img);
                    
                    rectTrasparent = scope.$factory.rect(capacidad.offsets[scope.layout], capacidadWidth, capacidadHeight);
                    rectTrasparent = scope.$paint.rectTrasparent(rectTrasparent);
                    rectTrasparent.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);

                    capacidadGroup.append(rectHover).append(corner).append(img).append(rectTrasparent);
                    var flag = false;
                    rectTrasparent.click(function(){
                        
                        if(!flag){
                            rect = scope.$paint.rectActive(rect);
                            textbox = scope.$paint.fontColorWhite(textbox);
                        }else{
                            rect = scope.$paint.rectCapacidades(rect);
                            textbox = scope.$paint.fontColorGray(textbox);
                        }
                        flag = !flag;

                    });
                    rectTrasparent.hover(function(){
                        rectHover.attr({visibility: "visible"});
                        img.attr({visibility: "visible"});
                    },function(){
                        rectHover.attr({visibility: "hidden"});
                        img.attr({visibility: "hidden"});
                    });
                    obj = scope.buildSubCapacidades(capacidad.subcapacidades, capacidad.offsets[scope.layout]);
                    capacidadMainGroup.append(obj.g);

                }
                obj.rect = rectTrasparent;
                obj.gCapacidad = capacidadMainGroup;
                obj.gFlecha = node;

                return obj;
            };
            
            // Construye las capacidades de cada proceso
            scope.buildProcesses = function () {

                scope.procesosGroup = scope.svg.group();
                scope.objss = [];
                scope.prccessArr = [];

                for (var i in scope.source) {
                    var intersection;
                    var proceso = scope.source[i];
                    var procesoGroup = scope.svg.group();
                    var procesoTituloGroup = scope.svg.group();
                    var procesoCapacidadesGroup = scope.svg.group();

                    if ((Number(i) + 1) < scope.source.length) {
                        proceso = $vash.intersectionFill(proceso, scope.source[Number(i) + 1],true);

                        
                        var intersections = [];
                        intersections[0] = JSON.parse(JSON.stringify(proceso.intersection[0]));
                        intersections[1] = JSON.parse(JSON.stringify(proceso.intersection[1]));
                        intersections[2] = JSON.parse(JSON.stringify(proceso.intersection[2]));

                        //setting last arrow 1
                        intersections[1][2].y = intersections[1][2].y - (scope.source[Number(i) + 1].height[scope.layout] / 2) - 15;

                        intersections[0][0].y = 85;
                        intersections[0][1].y = 85;
                        intersections[0][2].y = 85;
                        intersections[0][1].y = 85;
                        intersections[0][0].y = 85;

                        intersections[0][1].x = intersections[0][0].x + 130;
                        intersections[0][2].x = intersections[0][0].x + 130;
                        intersections[0][1].x = intersections[0][0].x + 130;
                        // console.log(proceso);
                        var arr =  [
                            intersections[scope.layout][0].x, 
                            intersections[scope.layout][0].y, 
                            intersections[scope.layout][1].x, 
                            intersections[scope.layout][1].y, 
                            intersections[scope.layout][2].x, 
                            intersections[scope.layout][2].y, 
                            intersections[scope.layout][1].x, 
                            intersections[scope.layout][1].y, 
                            intersections[scope.layout][0].x, 
                            intersections[scope.layout][0].y
                        ];
                        
                        intersection = scope.$factory.polyline(arr);
                        
                        var baseArrow = 12;
                        var offsetsArrow = [
                            intersections[0][2],
                            intersections[1][2],
                            intersections[2][2]
                        ];
                        //offsetsArrow[0].x -=100;
                        offsetsArrow[0].y -=6;

                        var arrow = scope.$factory.arrow(offsetsArrow[scope.layout], baseArrow);
                        if(scope.layout == 0){
                            scope.$paint.rotate90(arrow);
                        }
                        // set intersections and offsets
                        intersection.data('intersections',intersections);
                        arrow.data('offsets',offsetsArrow).data('base',baseArrow);

                        var nodeProceso = scope.svg.group();
                        nodeProceso.append(intersection).append(arrow);
                        procesoGroup.append(nodeProceso);

                    }

                    // proceso figures
                    var rectProceso, rectProcesoHeader, textbox, circle, textboxCircle; 
                    
                    rectProceso = scope.$factory.rect(proceso.offsets[scope.layout], proceso.width[scope.layout], proceso.height[scope.layout]);
                    rectProceso = scope.$paint.rectProceso(rectProceso);
                    var offsetHeader = [];
                    offsetHeader[0] = {
                        x: proceso.offsets[0].x,
                        y: proceso.offsets[0].y - (proceso.height[0] / 2) + 45
                    };
                    offsetHeader[1] = {
                        x: proceso.offsets[1].x,
                        y: proceso.offsets[1].y - (proceso.height[1] / 2) + 45
                    };
                    offsetHeader[2] = {
                        x: proceso.offsets[2].x,
                        y: proceso.offsets[2].y - (proceso.height[2] / 2) + 45
                    };

                    rectProcesoHeader = scope.$factory.rect(offsetHeader[scope.layout], proceso.width[scope.layout], 90);
                    rectProcesoHeader = scope.$paint.rectProcesoHeader(rectProcesoHeader);


                    var offsetHeaderText = [];
                    offsetHeaderText[0] = {
                        x: offsetHeader[0].x - (proceso.width[0] / 2) + 45,
                        y: offsetHeader[0].y
                    };
                    offsetHeaderText[1] = {
                        x: offsetHeader[1].x - (proceso.width[1] / 2) + 45,
                        y: offsetHeader[1].y
                    };
                    offsetHeaderText[2] = {
                        x: offsetHeader[2].x - (proceso.width[2] / 2) + 45,
                        y: offsetHeader[2].y
                    };

                    var textboxWidth = proceso.width[scope.layout] - 50;
                    textbox = scope.$factory.textbox(offsetHeaderText[scope.layout], textboxWidth, 90, proceso.name, 14);
                    textbox = scope.$paint.textLeft(textbox);

                    var offsetHeaderCircle = JSON.parse(JSON.stringify(offsetHeaderText));
                    offsetHeaderCircle[0].x -= 20;
                    offsetHeaderCircle[1].x -= 20;
                    offsetHeaderCircle[2].x -= 20;

                    circle = scope.$factory.circle(offsetHeaderCircle[scope.layout], 15);
                    circle = scope.$paint.circleEnd(circle);
                    textboxCircle = scope.$factory.textbox(offsetHeaderCircle[scope.layout], 30, 30, (Number(i) + 1) + "", 18);
                    textboxCircle = scope.$paint.fontColorWhite(textboxCircle);


                    // Setting data
                    rectProceso.data('offsets',proceso.offsets).data('width',proceso.width).data('height',proceso.height);
                    rectProcesoHeader.data('offsets',offsetHeader).data('width',proceso.width).data('height',[90,90,90]);
                    textbox.data('offsets',offsetHeaderText).data('width',proceso.width).data('height',[90,90,90]);
                    circle.data('offsets',offsetHeaderCircle).data('radio',[15,15,15]);
                    textboxCircle.data('offsets',offsetHeaderCircle).data('width',[30,30,30]).data('height',[30,30,30]);

                    procesoGroup.append(rectProceso).data('height',proceso.height);
                    procesoTituloGroup.append(rectProcesoHeader).append(textbox).append(circle).append(textboxCircle);

                    var objs = [];
                    for (var j in scope.source[i][scope.type]) {
                        var obj = {};
                        var capacidad = scope.source[i][scope.type][j];
                        obj = scope.buildCapacidad(capacidad, i, j);
                        procesoCapacidadesGroup.append(obj.gCapacidad);


                        // Event
                        if (capacidad.subcapacidades.length) {
                            obj.rect.data("flag", false);
                            obj.rect.data("i", i);
                            obj.rect.data("j", j);
                            // obj.rect.data("open",false);
                            obj.rect.click(scope.capacidadClick);
                            obj.open = false;
                        }

                        objs[j] = obj;
                    }

                    scope.prccessArr.push(procesoGroup);
                    scope.objss[i] = objs;
                    procesoGroup.append(procesoTituloGroup).append(procesoCapacidadesGroup);
                    scope.procesosGroup.append(procesoGroup);
                }

            };
            
            // Agrega el evento click a cada capacidad
            scope.capacidadClick = function (ev) {
                
                console.log(ev);
                
                var i = this.data("i");
                var j = this.data("j");
                var thisProcess = scope.procesosGroup.children()[i].children()[1];
                var processLength = scope.procesosGroup.children().length;
                
                function getHeight() {
                    var countOpens = 0;
                    
                    for (var b = 0; b < scope.objss[i].length; b++){
                        if(scope.objss[i][b].height) {
                            if(scope.objss[i][b].open) {
                                countOpens += scope.objss[i][b].height;
                            }else{
                                countOpens -= scope.objss[i][b].height;
                            }
                        }
                    }
                    return countOpens;
                }
                
                function getMayorHeight() {
                    var countOpens = [];

                    for (var b = 0; b < scope.objss[i].length; b++){
                        if(scope.objss[i][b].height) {
                            if(scope.objss[i][b].open) {
                                countOpens.push(scope.objss[i][b].height);
                            } else {
                                countOpens.push(scope.objss[i][b].height);
                            }
                        }
                    }
                    return countOpens.length !== 0 ? Math.max.apply( Math, countOpens) : 0;
                }

                function getMayorHeightLay2() {
                    var heightDelProceso = thisProcess.data().height[scope.layout];
                    var countOpens = [];
                    
                    for (var b = 0; b < scope.objss[i].length; b++){
                        if(scope.objss[i][b].height) {
                            if(scope.objss[i][b].open) {
                                countOpens.push(scope.objss[i][b].height);
                            }
                        }
                    }
                    
                    if(countOpens.length !== 0) {
                        if(heightDelProceso > countOpens) {
                            return 0;
                        } else {
                            return Math.max.apply( Math, countOpens);
                        }
                    } else {
                        return 0;
                    }
                }

                function move(countOpens, baseHeight, openHeight) {

                    if (scope.layout == 2) {
                        if(openHeight < 1) {
                            countOpens = 0;
                        } else {
                            countOpens = getMayorHeightLay2();
                        }
                        
                    }
                    
                    if(scope.layout == 1){
                        
                        if(openHeight < 1) {
                            countOpens = -getMayorHeight();
                        } else {
                            countOpens = getMayorHeight();
                        }

                        for (var x = Number(i) + 1; x < processLength; x++) {

                            var incrementoAltura = scope.prccessArr[(x)].data('heightOpen') || 0;

                            //seteamos el heightdeOpen
                            console.log(countOpens);
                            scope.prccessArr[x].data('heightOpen', (countOpens + incrementoAltura));

                            scope.prccessArr[x].animate({
                                transform: "t0," + (countOpens + incrementoAltura)
                            }, 300);
                        }

                        if (countOpens > 0) {
                            scope.prccessArr[i].children()[0].animate({
                                transform: "t0," + countOpens
                            }, 300);
                        } else {
                            scope.prccessArr[i].children()[0].animate({
                                transform: "t0," + 0
                            }, 300);
                        }

                        // Mueve *todas las capacidades hermanas hacia abajo
                        if (openHeight < 1) {
                            for (var inicio = Number(j) + 1; inicio < scope.objss[i].length; inicio++) {
                                scope.objss[i][inicio].gCapacidad.animate({
                                    transform: "t0," + 0
                                }, 300);
                            }
                            // Mueve la flecha de la capacidad abierta
                            scope.objss[i][j].gFlecha.animate({
                                transform: "t0," + openHeight
                            }, 300);
                        } else {
                            for (var inicio = Number(j) + 1; inicio < scope.objss[i].length; inicio++) {
                                scope.objss[i][inicio].gCapacidad.animate({
                                    transform: "t0," + countOpens
                                }, 300);
                            }
                            // Mueve la flecha de la capacidad abierta
                            scope.objss[i][j].gFlecha.animate({
                                transform: "t0," + openHeight
                            }, 300); 
                        }
                    }
                    
                    if(scope.layout < 1){
                        countOpens = getHeight();
                        // Mueve *todas las capacidades hermanas hacia abajo
                        if (openHeight < 1) {
                            for (var inicio = Number(j) + 1; inicio < scope.objss[i].length; inicio++) {
                                scope.objss[i][inicio].gCapacidad.animate({
                                    transform: "t0," + openHeight
                                }, 300);
                            }
                            // Mueve la flecha de la capacidad abierta
                            scope.objss[i][j].gFlecha.animate({
                                transform: "t0," + openHeight
                            }, 300);
                        } else {
                            for (var inicio = Number(j) + 1; inicio < scope.objss[i].length; inicio++) {
                                scope.objss[i][inicio].gCapacidad.animate({
                                    transform: "t0," + openHeight
                                }, 300);
                            }
                            // Mueve la flecha de la capacidad abierta
                            scope.objss[i][j].gFlecha.animate({
                                transform: "t0," + openHeight
                            }, 300); 
                        }
                    }
                    
                    // crece el tamaño del proceso (height del proceso + (el número de capacidades abiertas || el height mayor))
                    
                    if(countOpens > 0){
                        thisProcess.animate({
                            height: baseHeight + countOpens
                        }, 300);
                    }else{
                        thisProcess.animate({
                            height: baseHeight
                        }, 300);
                    }
                    // abre el contenido de las capacidades
                    scope.objss[i][j].backMask.animate({
                        height: openHeight
                    }, 300);
                    
                }
                
                var countOpens = 0;
                var baseHeight = thisProcess.data().height[scope.layout];
                var openHeight = scope.objss[i][j].height;
                
                // La capacidad esta cerrada
                if(!scope.objss[i][j].open){
                    scope.objss[i][j].open = true;
                    move(countOpens, baseHeight, openHeight);
                } else {
                    scope.objss[i][j].open = false;
                    move(countOpens, baseHeight, 0);
                }
            };
            
            
            // Router de Layouts
            scope.buildLayouts = function () {
                scope.buildLayoutInitial();
                scope.buildLayoutHorizontal();
                scope.buildLayoutVertical();
            };
            
            // Inicializa la pantalla
            scope.init = function () {
                scope.buildLayouts();
                scope.config.changeLayoutSelect(scope.layout);
            };
            
            // Cambia el JSON que cambia el contenido del SVG
            scope.reset = function () {
                scope.settingProcesos(scope.source);
                scope.buildProcesses();
            };

            scope.init();

            scope.$watch('source', function () {
                if (scope.source.length) {
                    scope.svg.clear();
                    scope.reset();
                }
            });

            scope.$watch('layout', function () {
                scope.svg.clear();
                scope.reset();
            });

            scope.$watch('type', function () {
                scope.svg.clear();
                scope.reset();
            });

        };
        return {
            restrict: 'A',
            link: Link,
            require: '?ngModel',
            scope: {
                source: '=set',
                config: '=config',
                layout: '=',
                type: '='

            }
        };
    };
    angular
        .module('ngWays', [])
        .directive('ngWays', Directive);
})();
