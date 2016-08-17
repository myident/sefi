/* global angular, Snap */

(function () {

    var service = function ($vash, $paint, $shapes) {
        return {
            /* processes(): - crea cada uno de los procesos existentes */
            /* ************************************************************************************** */
            /* Recibes los siguientes parametros:  */
            /* source:        es el JSON que contiene los procesos */
            /* paper:         es el contexto de Snap SVG, por ejemplo scope.svg() */
            /* layout:        se refiere al layout que pintará ya sea por procesos, por áreas o aplicaciones */
            /* objss:         es el array que se llenará de capacidades */
            /* prccessArr:    es el array de procesos que se llenará una vez que se terminé de iterar el JSON */
            /* procesosGroup: es el grupo de snapSVG donde se agruparán los  svg de Procesos */
            /* type:          se refiere a si se visualizarán reglas o capacidades */
            processes: function (source, paper, layout, objss, prccessArr, procesosGroup, type, justProcess) {

                procesosGroup = paper.group();

                $shapes.svg(paper);
                var self = this;
                var intersection;
                var procesoGroup = paper.group();
                var procesoTituloGroup = paper.group();
                var procesoCapacidadesGroup = paper.group();
                var proceso, connection;

                //console.log(source);
                
                for (var i in source) {
                    
                    proceso = source[i];
                
                    if ((Number(i) + 1) < source.length) {
                                                
                        proceso = $vash.intersectionFill(
                            proceso, 
                            source[Number(i) + 1], 
                            true);
                        


                        var primeraCapacidadDelProcesoSiguiente = source[Number(i) + 1];
                        var ultimaCapacidadDelProcesoActual = proceso[type][(proceso[type].length - 1)];
                        
                        connection = $vash.customIntersectionFill(
                            ultimaCapacidadDelProcesoActual, 
                            primeraCapacidadDelProcesoSiguiente);


                        var intersections = [];
                        
                        intersections[0] = JSON.parse(JSON.stringify(proceso.intersection[0]));
                        
                        intersections[1] = JSON.parse(JSON.stringify(connection.intersection[1]));
                        intersections[2] = JSON.parse(JSON.stringify(connection.intersection[2]));

                        intersections[0][0].y = 65;
                        intersections[0][1].y = 65;
                        intersections[0][2].y = 65;
                        intersections[0][1].y = 65;
                        intersections[0][0].y = 65;
                        
                        
                        if (connection.direction[2] == 'down') {
                            intersections[2][2].y = intersections[2][2].y - 4;
                        }
                        
                        if (connection.direction[1] == 'down') {
                            intersections[1][2].y = intersections[1][2].y - 4;
                        }
                        
                        // Tamaño de la flecha en procesos
                        intersections[0][1].x = intersections[0][0].x + 105;
                        intersections[0][2].x = intersections[0][0].x + 105;
                        intersections[0][1].x = intersections[0][0].x + 105;


                        var arr = [
                            intersections[layout][0].x,
                            intersections[layout][0].y,
                            intersections[layout][1].x,
                            intersections[layout][1].y,
                            intersections[layout][2].x,
                            intersections[layout][2].y
                        ];

                        intersection = $shapes.factory.polyline(arr);
                        
                        $paint.processPolyline(intersection);
                        
                        

                        var baseArrow = 12;
                        var offsetsArrow = [
                            intersections[0][2],
                            intersections[1][2],
                            intersections[2][2]
                        ];
                        offsetsArrow[0].x -= 5;
                        offsetsArrow[0].y -= 6;
                        
                        
                        
                        if(connection.direction[1] == 'left'){
                            offsetsArrow[1].x += 5;
                            offsetsArrow[1].y -= 6; 
                        }
                    
                        if(connection.direction[2] == 'left'){
                            offsetsArrow[2].x += 5;
                            offsetsArrow[2].y -= 6; 
                        }
                        
                        if(connection.direction[1] == 'right'){
                            offsetsArrow[1].x -= 5;
                            offsetsArrow[1].y -= 6;
                        }
                        
                        if(connection.direction[2] == 'right'){
                            offsetsArrow[2].x -= 5;
                            offsetsArrow[2].y -= 6; 
                        }
                        
                        if (connection.direction[2] == 'down') {
                            offsetsArrow[2].y -= 42; 
                        }
                        
                        if (connection.direction[1] == 'down') {
                            offsetsArrow[1].y -= 42; 
                        }


                        var arrow = $shapes.factory.arrow(offsetsArrow[layout], baseArrow);
                        if (layout === 0) {
                            $paint.rotate90(arrow);
                        }
                        if (connection.direction == 'right' && layout == 2) {
                            $paint.rotate90(arrow);
                        }
                        
                        if (connection.direction == 'up' && layout == 2) {
                            $paint.rotate180(arrow);
                        }
                        
                        if(connection.direction[1] == 'left' && layout == 1){
                            $paint.rotateMinus90(arrow);
                        }
                        
                        if(connection.direction[1] == 'right' && layout == 1){
                            $paint.rotate90(arrow);
                        }
                        
                        if(connection.direction[2] == 'left' && layout == 2){
                            $paint.rotateMinus90(arrow);
                        }
                        
                        if(connection.direction[2] == 'right' && layout == 2){
                            $paint.rotate90(arrow);
                        }
                        
                        $paint.processArrow(arrow);
                        
                        
                        
                        // set intersections and offsets
                        intersection.data('intersections', intersections);
                        arrow.data('offsets', offsetsArrow).data('base', baseArrow);

                        var nodeProceso = paper.group();
                        nodeProceso.append(intersection).append(arrow);
                        procesoGroup.append(nodeProceso);

                    }
                    
                    if (layout === 0) {
                        var etiquetaProcesos, etiquetaCapacidades, etiquetaReglas;
                        if (justProcess) {
                            if (type == 'reglas') {
                                etiquetaReglas = $shapes.factory.img({
                                    x: -2,
                                    y: 121
                                }, './assets/img/reglas.png', 30, 480);
                                //}, './assets/img/reglas.svg', 30, 480);
                            } else {
                                etiquetaCapacidades = $shapes.factory.img({
                                    x: -2,
                                    y: 121
                                }, './assets/img/capacidades.png', 30, 378);
                                //}, './assets/img/capacidades.svg', 30, 378);
                                
                            }

                        }

                        etiquetaProcesos = $shapes.factory.img({
                            x: -2,
                            y: 25
                        }, './assets/img/proceso.png', 30, 78);
                        //}, './assets/img/proceso.svg', 30, 78);
                    }
                    


                    // Background del proceso
                    var rectProceso, rectProcesoHeader, textbox, circle, textboxCircle;
                    rectProceso = $shapes.factory.rect(proceso.offsets[layout], proceso.width[layout], proceso.height[layout]);
                    rectProceso = $paint.rectProceso(rectProceso);
                    
                    
                    // header del proceso
                    var offsetHeader = [];
                    offsetHeader[0] = {
                        x: proceso.offsets[0].x,
                        y: proceso.offsets[0].y - (proceso.height[0] / 2) + 35
                    };
                    offsetHeader[1] = {
                        x: proceso.offsets[1].x,
                        y: proceso.offsets[1].y - (proceso.height[1] / 2) + 35
                    };
                    offsetHeader[2] = {
                        x: proceso.offsets[2].x,
                        y: proceso.offsets[2].y - (proceso.height[2] / 2) + 35
                    };
                    rectProcesoHeader = $shapes.factory.rect(offsetHeader[layout], (proceso.width[layout] - 2), (70 - 2));
                    
                    var shadow = paper.filter(Snap.filter.shadow(0, 3, 2, '#000', 0.2));
                    rectProcesoHeader = $paint.rectProcesoHeader(rectProcesoHeader, shadow);
                    
                    
                    // Texto del header del proceso
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
                    // Offset del texto del header del proceso
                    var textboxWidth = proceso.width[layout] - 50;
                    textbox = $shapes.factory.textbox(offsetHeaderText[layout], textboxWidth, 90, proceso.name,11);
                    textbox = $paint.textLeft(textbox);
                    
                    
                    // Circulo del header del proceso
                    var offsetHeaderCircle = JSON.parse(JSON.stringify(offsetHeaderText));
                    offsetHeaderCircle[0].x -= 20;
                    offsetHeaderCircle[1].x -= 20;
                    offsetHeaderCircle[2].x -= 20;
                    circle = $shapes.factory.circle(offsetHeaderCircle[layout], 15);
                    circle = $paint.circleEnd(circle);
                    textboxCircle = $shapes.factory.textbox(offsetHeaderCircle[layout], 30, 30, (Number(i) + 1) + "", 18);
                    textboxCircle = $paint.fontColorWhite(textboxCircle);


                    // Setting data
                    rectProceso.data('offsets', proceso.offsets).data('width', proceso.width).data('height', proceso.height);
                    rectProcesoHeader.data('offsets', offsetHeader).data('width', proceso.width).data('height', [90, 90, 90]);
                    textbox.data('offsets', offsetHeaderText).data('width', proceso.width).data('height', [90, 90, 90]);
                    circle.data('offsets', offsetHeaderCircle).data('radio', [15, 15, 15]);
                    textboxCircle.data('offsets', offsetHeaderCircle).data('width', [30, 30, 30]).data('height', [30, 30, 30]);

                    procesoGroup.append(rectProceso).data('height', proceso.height);
                    procesoTituloGroup.append(rectProcesoHeader).append(textbox).append(circle).append(textboxCircle);

                    var objs = [];
                    
                    if(justProcess){

                        for (var j in source[i][type]) {
                            var obj = {};
                            var capacidad = source[i][type][j];
                            obj = self.capacidades(capacidad, i, j, paper, layout, source, type);
                            procesoCapacidadesGroup.append(obj.gCapacidad);

                            // Event
                            if (capacidad.subcapacidades.length) {
                                obj.rect.data("flag", false);
                                obj.rect.data("i", i);
                                obj.rect.data("j", j);
                                // obj.rect.data("open",false);
                                //obj.rect.click($scope.capacidadClick);
                                obj.open = false;
                            }

                            objs[j] = obj;
                        }
                    }


                    prccessArr.push(procesoGroup);
                    objss[i] = objs;
                    procesoGroup.append(procesoTituloGroup).append(procesoCapacidadesGroup);
                    procesosGroup.append(procesoGroup);
                }

            },

            getOffsetsTo: function(source,id, capacidad){
                for(var i in source){
                    for(var j in source[i]['reglas']){
                        var regla = source[i]['reglas'][j];
                        if(regla.flowId === id){
                            return regla.offsets;
                        }
                    }
                }
                capacidad.name = "ERROR: Paso siguiente inconsistente"
                return capacidad.offsets;
            },
            offsetToArr: function(arr, layout){
                var arrTemp = [];
                for(var i in arr){
                    arrTemp.push(arr[i][layout].x);
                    arrTemp.push(arr[i][layout].y);
                }
                return arrTemp;
            },

            /* capacidades(): - crea cada uno de las capacidades existentes */
            /* ************************************************************************************** */
            /* Recibes los siguientes parametros:  */
            /* capacidad: es el JSON de la capacidad correspondiente */
            /* i:         es el contexto de Snap SVG, por ejemplo scope.svg() */
            /* j:         se refiere al layout que pintará ya sea por procesos, por áreas o aplicaciones */
            /* paper:     es el contexto de Snap SVG, por ejemplo scope.svg() */
            /* layout:    se refiere al layout que pintará ya sea por procesos, por áreas o aplicaciones */
            /* source:    es el JSON que contiene los procesos */
            /* type:      se refiere a si se visualizarán reglas o capacidades */
            capacidades: function (capacidad, i, j, paper, layout, source, type) {
                
                var capacidadWidth = 90;
                var capacidadHeight = 50;
                var baseArrow = 12;

                var rect, textbox, intersection, arrow, rectTrasparent;
                
                var capacidadMainGroup = paper.group();
                var capacidadGroup = paper.group();
                

                $shapes.svg(paper);

                var node = paper.group();
                
                // Construye flechas
                
                
                
                if(type == 'capacidades'){

                    if ((Number(j) + 1) < source[i][type].length) {
                    
                    
                    capacidad = $vash.intersectionFill(
                        capacidad, 
                        source[i][type][(Number(j) + 1)], 
                        true);

                    var intersections = [];
                    
                    intersections[0] = JSON.parse(JSON.stringify(capacidad.intersection[0]));
                    intersections[1] = JSON.parse(JSON.stringify(capacidad.intersection[1]));
                    intersections[2] = JSON.parse(JSON.stringify(capacidad.intersection[2]));

                    $vash.setIntersectionsWithDirection(
                        capacidad, 
                        intersections, 
                        capacidadWidth, 
                        capacidadHeight);

                    var arr = [
                        intersections[layout][0].x,
                        intersections[layout][0].y,
                        intersections[layout][1].x,
                        intersections[layout][1].y,
                        intersections[layout][2].x,
                        intersections[layout][2].y
                    ];

                    intersection = $shapes.factory.polyline(arr);

                    
                    
                    var offsetsArrow = [
                        intersections[0][2],
                        intersections[1][2],
                        intersections[2][2]
                    ];
                    
                    if(capacidad.direction[2] == 'right' || 
                       capacidad.direction[2] == 'left' && 
                       layout == 2) {
                        offsetsArrow[2].y -= 6;
                    }
                    
                    if(capacidad.direction[1] == 'right' || 
                       capacidad.direction[1] == 'left' && 
                       layout == 1) {
                        offsetsArrow[1].y -= 6;
                    }
                    
                    arrow = $shapes.factory.arrow(offsetsArrow[layout], baseArrow);
                    $vash.rotateArrowFromDirection(capacidad, layout, arrow);
                    

                    // Guarda el Data en los polylines
                    intersection
                        .data('intersections', intersections);
                    
                    // Guarda el Data en la punta de las flechas
                    arrow
                        .data('offsets', offsetsArrow)
                        .data('base', baseArrow);

                    
                    // Agrupa la línea con la punta de la flecha
                    node.append(intersection).append(arrow);
                    
                    // Agrupa la flecha y línea dentro de la capacidad
                    capacidadGroup.append(node);
                }


                    rect = $shapes.factory.rect(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight);
                    
                        rect = $paint.rectCapacidades(rect);

                        textbox = $shapes.factory.textbox(
                            capacidad.offsets[layout], 
                            capacidadWidth, 
                            capacidadHeight, 
                            capacidad.name, 11);

                        // Setting data
                        rect
                            .data('offsets', capacidad.offsets)
                            .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                            .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                        
                        textbox
                            .data('offsets', capacidad.offsets)
                            .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                            .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                        
                        capacidadGroup
                            .append(rect)
                            .append(textbox);

                        capacidadMainGroup
                            .append(capacidadGroup);
                }
                else{


                switch(capacidad.idfigura){

                    case 1: // Proceso
                    

                    

                    if ((Number(j) + 1) < source[i][type].length) {
                        var offset = capacidad.offsets;
                        var offsetTo = this.getOffsetsTo(source,capacidad.nextTo, capacidad);
                        var margin = {width:capacidadWidth, height: capacidadHeight};
                        var linesToConexion = $vash.getLineToConexion(offset, offsetTo,margin);
                        capacidad.intersection = linesToConexion.linesToConexion;
                        capacidad.direction = linesToConexion.directions;

                        capacidad.offsetsArrow = [
                                                    capacidad.intersection[3][0],
                                                    capacidad.intersection[3][1],
                                                    capacidad.intersection[3][2],
                                                ];

                        intersection = $shapes.factory.polyline(this.offsetToArr(capacidad.intersection,layout));
                        //arrow = $shapes.factory.arrowDown(capacidad.offsetsArrow[layout], baseArrow);

                        switch(capacidad.direction[layout].final){
                            case 'down': arrow = $shapes.factory.arrowDown(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'right': arrow = $shapes.factory.arrowRight(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'left': arrow = $shapes.factory.arrowLeft(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'up': arrow = $shapes.factory.arrowLeft(capacidad.offsetsArrow[layout], baseArrow); break;
                        }
                    }
                    rect = $shapes.factory.rect(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight);
                    
                    rect = $paint.rectCapacidades(rect);

                    
                    // if((capacidad.flowId+1) === capacidad.nextTo){
                        textbox = $shapes.factory.textbox(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight, 
                        capacidad.name, 11);
                    
                    // }else{
                    //     capacidad.offsets[layout].y = capacidad.offsets[layout].y + 12;

                    //     textbox = $shapes.factory.textbox(
                    //     capacidad.offsets[layout], 
                    //     capacidadWidth, 
                    //     capacidadHeight, 
                    //     'Error en Base de Datos', 11);
                    //     textbox = $paint.textRed(textbox);
                    //     $paint.textRed(arrow || textbox);
                    //     $paint.lineRed(intersection || textbox);

                        
                    //     var imgUrl  = 'assets/img/ICONO_TACHE.png';
                    //     var imgError = $shapes.factory.imgError(capacidad.offsets[layout],imgUrl,20,20);
                    // }

                    // Setting data
                    rect
                        .data('offsets', capacidad.offsets)
                        .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                        .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                    
                    textbox
                            .data('offsets', capacidad.offsets)
                            .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                            .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);

                    

                    capacidadGroup
                        .append(rect)
                        .append(intersection)
                        .append(arrow)
                        .append(textbox);

                    capacidadMainGroup
                        .append(capacidadGroup);

                    break;

                    case 2: 

                        if ((Number(j) + 1) < source[i][type].length) {

                            var offset = capacidad.offsets;
                            var offsetTo = this.getOffsetsTo(source,capacidad.nextTo, capacidad);
                            var margin = {width:capacidadWidth, height: capacidadHeight};

                            var linesToConexion = $vash.getLineToConexion(offset, offsetTo,margin);
                            capacidad.intersection = linesToConexion.linesToConexion;
                            capacidad.direction = linesToConexion.directions;

                            capacidad.offsetsArrow = [
                                                        capacidad.intersection[3][0],
                                                        capacidad.intersection[3][1],
                                                        capacidad.intersection[3][2],
                                                    ];

                            intersection = $shapes.factory.polyline(this.offsetToArr(capacidad.intersection,layout));
                            arrow = $shapes.factory.arrow(capacidad.offsetsArrow[layout], baseArrow);
                        }
                        rect = $shapes.factory.rectLines(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight);
                    
                    rect = $paint.rectCapacidades(rect);

                    // if((capacidad.flowId+1) === capacidad.nextTo){
                        textbox = $shapes.factory.textbox(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight, 
                        capacidad.name, 11);
                    
                    // }else{
                    //     capacidad.offsets[layout].y = capacidad.offsets[layout].y + 12;

                    //     textbox = $shapes.factory.textbox(
                    //     capacidad.offsets[layout], 
                    //     capacidadWidth, 
                    //     capacidadHeight, 
                    //     'Error en Base de Datos', 11);
                    //     textbox = $paint.textRed(textbox);
                    //     $paint.textRed(arrow || textbox);
                    //     $paint.lineRed(intersection || textbox);
                        
                    //     var imgUrl  = 'assets/img/ICONO_TACHE.png';
                    //     var imgError = $shapes.factory.imgError(capacidad.offsets[layout],imgUrl,20,20);
                    // }

                    // Setting data
                    rect
                        .data('offsets', capacidad.offsets)
                        .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                        .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                    
                    textbox
                        .data('offsets', capacidad.offsets)
                        .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                        .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                    
                    capacidadGroup
                        .append(rect)
                        .append(intersection)
                        .append(arrow)
                        .append(textbox);

                    capacidadMainGroup
                        .append(capacidadGroup);
                    break;
                    case 3: // Rombo
                    
                    var arrowTwo;

                    

                        var offset = capacidad.offsets;
                        var offsetTo = this.getOffsetsTo(source,capacidad.nextTo, capacidad);
                        var offsetToTwo = this.getOffsetsTo(source,capacidad.nextToTwo, capacidad);

                        var margin = {width:capacidadWidth, height: capacidadHeight};
                        var margin = {width:capacidadWidth, height: capacidadHeight};

                        var linesToConexion = $vash.getLineToConexion(offset, offsetTo,margin);
                        var linesToConexionTwo = $vash.getLineToConexion(offset, offsetToTwo,margin);

                        capacidad.intersection = linesToConexion.linesToConexion;
                        capacidad.intersectionTwo = linesToConexionTwo.linesToConexion;
                        capacidad.direction = linesToConexion.directions;
                        capacidad.directionTwo = linesToConexionTwo.directions;

                        capacidad.offsetsArrow = [
                                                    capacidad.intersection[3][0],
                                                    capacidad.intersection[3][1],
                                                    capacidad.intersection[3][2],
                                                ];
                        capacidad.offsetsArrowTwo = [
                                                    capacidad.intersectionTwo[3][0],
                                                    capacidad.intersectionTwo[3][1],
                                                    capacidad.intersectionTwo[3][2],
                                                ];
                        

                        var offset = capacidad.offsets[layout], lineElse, arrowElse;
                        

                        switch(capacidad.direction[layout].final){
                            case 'down': arrow = $shapes.factory.arrowDown(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'right': arrow = $shapes.factory.arrowRight(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'left': arrow = $shapes.factory.arrowLeft(capacidad.offsetsArrow[layout], baseArrow); break;
                            case 'up': arrow = $shapes.factory.arrowLeft(capacidad.offsetsArrow[layout], baseArrow); break;
                        }

                        
                        intersection = $shapes.factory.polyline(this.offsetToArr(capacidad.intersection,layout));
                        
                    
                    // if ((Number(j) + 1) < source[i][type].length) {
                        switch(capacidad.directionTwo[layout].final){
                            case 'down': arrowTwo = $shapes.factory.arrowDown(capacidad.offsetsArrowTwo[layout], baseArrow); break;
                            case 'right': arrowTwo = $shapes.factory.arrowRight(capacidad.offsetsArrowTwo[layout], baseArrow); break;
                            case 'left': arrowTwo = $shapes.factory.arrowLeft(capacidad.offsetsArrowTwo[layout], baseArrow); break;
                            case 'up': arrowTwo = $shapes.factory.arrowLeft(capacidad.offsetsArrowTwo[layout], baseArrow); break;
                        }
                        lineElse = $shapes.factory.polyline(this.offsetToArr(capacidad.intersectionTwo,layout));
                    // }

                    rect = $shapes.factory.rombo(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight);
                    
                    rect = $paint.rectCapacidades(rect);

                    textbox = $shapes.factory.textbox(
                        capacidad.offsets[layout], 
                        capacidadWidth, 
                        capacidadHeight, 
                        capacidad.name, 
                        11);
                    
                    // Setting data
                    rect
                        .data('offsets', capacidad.offsets)
                        .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                        .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                    textbox
                        .data('offsets', capacidad.offsets)
                        .data('width', [capacidadWidth, capacidadWidth, capacidadWidth])
                        .data('height', [capacidadHeight, capacidadHeight, capacidadHeight]);
                    
                    

                        capacidadGroup
                            .append(intersection)
                            .append(lineElse)
                            .append(arrow)
                            .append(arrowTwo)
                            .append(rect)
                            .append(textbox);

                    
                    capacidadGroup
                        .append(rect).append(textbox);

                    capacidadMainGroup
                        .append(capacidadGroup);

                    break;

                    default: break; 
                }
            }
                // // Construye Rombos
                // if(capacidad.type){
                // } 
                // // Construye rectangulos
                // else {
                    
                // }


                
                var obj = {};
                obj.rect = rectTrasparent;
                obj.gCapacidad = capacidadMainGroup;
                obj.gFlecha = node;

                return obj;
            }
        };
    };


    angular
        .module('mVash')
        .service('$build', service);

})();