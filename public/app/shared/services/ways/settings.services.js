/* global angular */

(function () {

    var service = function ($vash) {
        return {
            processes: function (procesos, offsets, config, layout, type, activarProcesos) {

                var array_height_procesos = [[], [], []],
                    array_width_procesos = [[], [], []],
                    array_offsets_y_procesos = [[], [], []],
                    array_offsets_x_procesos = [[], [], []];

                for (var i in procesos) {
                    var proceso = procesos[i];

                    for (var j in proceso[type]) {
                        var capacidad = proceso[type][j];

                        capacidad.areas.name = capacidad.areas.name || '';
                        capacidad.aplicaciones = capacidad.aplicaciones || [{ name: ''}];
                        capacidad.subcapacidades = capacidad.subcapacidades || [];

                        capacidad.offsets = [
                            {
                                x: 0,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 0
                            }
                        ];

                        offsets[0].x = config.layouts.initial[i].offset.x;
                        offsets[0].y = offsets[0].y;

                        if (proceso.name != 'Activation') {
                            offsets[1].x = $vash.findOffsetInArray(config.layouts.vertical, capacidad, 'areas').x;
                        }



                        offsets[1].y = offsets[1].y;

                        offsets[2].x = $vash.findOffsetInArray(config.layouts.horizontal, capacidad, 'aplicaciones').x;
                        offsets[2].y = offsets[2].y;

                        capacidad.offsets = JSON.parse(JSON.stringify(offsets));
                        offsets[0].y += 80; //Modifica las flechas en las capacidades
                        offsets[1].y += 80; // distancia entre capacidades
                        offsets[2].y += 80;
                    }

                    offsets[0].y = 145;
                    offsets[1].y += 170;
                    offsets[2].y += 150; // distancia capacidades 
                    // Preparación del objeto proceso con sus offsets
                    proceso.offsets = [
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            x: 0,
                            y: 0
                        },
                        {
                            x: 0,
                            y: 0
                        }
                    ];



                    // Se agrega el tamaño a los procesos
                    proceso = $vash.settingDimensionsToProcess(proceso, activarProcesos, layout, type);

                    proceso.offsets[0] = config.layouts.initial[i].offset;
                    proceso.offsets[0].y = 30 + (proceso.height[0] / 2); // se modifica para acomodar los procesos en Y

                    array_height_procesos[layout].push(proceso.height[layout]);
                    array_offsets_y_procesos[layout].push(proceso.offsets[layout].y);

                    array_width_procesos[layout].push(proceso.width[layout]);
                    array_offsets_x_procesos[layout].push(proceso.offsets[layout].x);

                }

                $vash.heightProcesos = array_height_procesos[layout];
                $vash.offsetProcesos.y = array_offsets_y_procesos[layout];
                $vash.widthProcesos = array_width_procesos[layout];
                $vash.offsetProcesos.x = array_offsets_x_procesos[layout];

            }
        };
    };


    angular
        .module('mVash')
        .service('$settings', service);

})();