/* global angular, Snap */

(function () {

    var service = function () {

        var scope = this;

        scope.svg = null;

        return {
            svg: function (value) {
                scope.svg = value;
            },
            imprimeValor: function () {
                console.log(scope.svg);
            },
            factory: {
                rect: function (offset, w, h) {
                    var x = offset.x - (w / 2);
                    var y = offset.y - (h / 2);
                    return scope.svg.rect(x, y, w, h);
                },
                rectLines: function (offset, w, h) {
                    var x = offset.x - (w / 2);
                    var y = offset.y - (h / 2);
                    var l1x1 = x + 10;
                    var l1y1 = y;
                    var l1x2 = x + 10;
                    var l1y2 = y + h;
                    var l2x1 = (x + w ) - 10;
                    var l2y1 = y;
                    var l2x2 = ( x + w ) - 10;
                    var l2y2 = y + h;

                    var g = scope.svg.group();
                    var rect = scope.svg.rect(x, y, w, h);
                    var l1 = scope.svg.line(l1x1, l1y1, l1x2, l1y2);
                    var l2 = scope.svg.line(l2x1, l2y1, l2x2, l2y2);

                    g.append(rect).append(l1).append(l2);

                    return g;
                },
                line: function (start, end) {
                    return scope.svg.line(start.x, start.y, end.x, end.y);
                },
                text: function (offset, w, text) {
                    var multitext = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle",
                        "font-family": "SF, sans-serif"
                    });
                    return multitext;
                },
                textbox: function (offset, w, h, text, fontSize) {
                    var textbox = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle",
                        "font-size": fontSize + 'px',
                        "font-family": "SF, sans-serif"
                    });
                    // var yt = offset.y - (text.node.clientHeight / 2);
                    // //var yt = (offset.y +(h / 2) - (text.node.clientHeight / 2))+10;
                    var yt = offset.y - (textbox.node.clientHeight / 2) + fontSize - 2;
                    textbox.attr({
                        y: yt
                    });
                    return textbox;
                },
                polyline: function (arr) {
                    var polyline = scope.svg.polyline(arr);
                    polyline.attr({
                        fill: "none",
                        stroke: "#757575",
                        strokeWidth: 1
                    });
                    // factotyArrow();
                    return polyline;
                },
                arrow: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + (x - (b / 2)) + " " + y + " L" + (x + (b / 2)) + " " + y + " L" + x + " " + (y + b) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                corner: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + x + " " + y + " L" + x + " " + (y + b) + " L" + (x -  b ) + " " + (y + b) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                rombo: function (offset, w, h) {
                    var p1 = {
                        x: offset.x,
                        y: offset.y - (h / 2)
                    };
                    var p2 = {
                        x: offset.x + (w / 2),
                        y: offset.y
                    };
                    var p3 = {
                        x: offset.x,
                        y: offset.y + (h / 2)
                    };
                    var p4 = {
                        x: offset.x - (w / 2),
                        y: offset.y
                    };

                    var pathStr = "M" + p1.x + " " + p1.y + " L" + p2.x + " " + p2.y + " L" + p3.x + " " + p3.y + " L" + p4.x + " " + p4.y + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "rgb(240, 240, 240)",
                        stroke: "#979797",
                        strokeWidth: 1
                    });
                    return path;
                },
                circle: function (offset, r) {
                    var x = offset.x;
                    var y = offset.y;
                    var circle = scope.svg.circle(x, y, r);
                    return circle;
                },
                img: function(offset, img, w, h){
                    var x = offset.x;
                    var y = offset.y;
                    var shadow = scope.svg.filter(Snap.filter.shadow(1, 2, 2, '#000', 0.05));
                    var circle = scope.svg.image(img, x, y, w, h).attr({filter: shadow});
                    
                    return circle;
                }
            }

        };
    };

    angular
        .module('mVash')
        .service('$shapes', service);

})();