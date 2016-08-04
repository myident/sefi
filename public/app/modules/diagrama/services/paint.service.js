/* global angular */

(function () {

    var service = function () {


        return {
            rectApplication: function (rect) {
                rect.attr({
                    fill: "rgba(21,11,44,.65)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectCapacidades: function (rect) {
                rect.attr({
                    fill: "rgba(255,255,255,1)",
                    stroke: "rgb(150,150,150)",
                    strokeWidth: 1
                });
                return rect;
            },
            rectCapacidadesHover: function(rect){
                rect.attr({
                    fill: "rgba(144,99,205,0.9)",
                    strokeWidth: 0,
                    visibility: "hidden"
                });
                return rect;
            },
            corner: function(rect){
                rect.attr({
                    fill: "rgba(144,99,205,0.9)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectActive: function(rect){
                rect.attr({
                    fill: "rgb(144, 99, 205)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectTrasparent: function(rect){
                rect.attr({
                    fill: "rgba(255,255,255,0)",
                    strokeWidth: 0,
                    cursor:"pointer"
                });
                return rect;
            },
            rectCapacidadesFooter: function (rect) {
                rect.attr({
                    fill: "rgba(21,11,44,.65)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectCapacidadesBack: function (rect) {
                rect.attr({
                    fill: "rgb(234, 189, 255)",
                    strokeWidth: 0
                });
                return rect;
            },

            ////////////////// new
            rectProceso: function (rect) {
                rect.attr({
                    stroke: "rgb(151,151,151)",
                    fill: "rgb(255,255,255)",
                    strokeWidth: 1,
                    "shape-rendering": "crispEdges"
                });
                return rect;
            },
            rectProcesoHeader: function (rect, filter) {
                
                rect.attr({
                    stroke: "rgb(151,151,151)",
                    fill: "rgb(244,244,244)",
                    strokeWidth: 1,
                    filter: filter,
                    "shape-rendering": "crispEdges"
                });
                return rect;
            },
            textLeft: function (text) {
                text.attr({
                    'text-anchor': "initial"
                });
                return text;
            },
            textRight: function (text) {
                text.attr({
                    'text-anchor': "end"
                });
                return text;
            },
            textCenter: function (text) {
                text.attr({
                    'text-anchor': "middle"
                });
                return text;
            },
            fillGray: function(fig){
                fig.attr({
                    fill: "rgb(126,126,126)"
                });
                return fig;
            },
            fillWhite: function(fig){
                fig.attr({
                    fill: "rgb(255,255,255)"
                });
                return fig;
            },
            fillByShow: function(fig,show){
                switch(show){
                    case 0: fig.attr({ fill: "rgb(144, 99, 205)" });break;
                    case 1: fig.attr({ fill: "rgb(180,58,125)" });break;
                    case 2: fig.attr({ fill: "rgb(101,83,186)" });break;
                    case 3: fig.attr({ fill: "rgb(80,190,197)" });break;
                }
                return fig;
            },




            lineApplication: function (line) {
                line.attr({
                    stroke: "rgb(150,150,150)",
                    strokeWidth: 1
                });
                return line;
            },
            textApplication: function (text) {
                text.attr({
                    transform: "r270",
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            textAreas: function (text) {
                text.attr({
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            textRed: function (text) {
                text.attr({
                    fill: "rgb(255,0,0)"
                });
                return text;
            },
            fontColorWhite: function (text) {
                text.attr({
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            fontColorGray: function(text){
                text.attr({
                    fill: "rgb(50, 50, 50)"
                });
                return text;
            },
            circleEnd: function (circle) {
                circle.attr({
                    fill: "#9063CD",
                    strokeWidth: 0
                });
                return circle;
            },
            rotate90: function (fig) {
                fig.attr({
                    transform: "r270"
                });
                return fig;
            },
            rotateMinus90: function (fig) {
                fig.attr({
                    transform: "r-270"
                });
                return fig;
            },
            rotate180: function (fig) {
                fig.attr({
                    transform: "r540"
                });
                return fig;
            },
            moveUpRight: function(fig){

                console.log(fig);
                var t = new Snap.Matrix();
                t.translate(5, -5);
                fig.transform(t);
                fig.attr({
                    transform: "r-270"
                });
                return fig;
            },
            hide: function(fig){
                fig.attr({
                    visibility: "hidden"
                });
                return fig;
            },
            fillWhite: function(fig){
                fig.attr({
                    fill: "rgb(255,255,255)"
                });
                return fig;
            },
            processArrow: function(fig) {
                fig.attr({
                    fill: "#9063CD"
                });
            },
            processPolyline: function(fig) {
                fig.attr({
                    stroke: "#9063CD",
                    strokeWidth: 1
                });
            },
            lineRed: function(fig){
                fig.attr({
                    stroke: "rgb(255,0,0)"
                });
            }
        };
    };


    angular
        .module('mDiagrama')
        .service('$paint', service);

})();