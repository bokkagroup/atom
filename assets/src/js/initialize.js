import $            from 'jquery';
import tabs         from './helpers/tabs.js';
import modals       from './helpers/modals.js';
import sliders      from './helpers/sliders.js';
import maps         from './helpers/maps.js';
import Map          from './organisms/map.js';

$(document).ready(() => {

    sliders();
    modals();
    tabs();
    maps();

    /**
     * Accordion
     */
    $('.accordion .title').on('click', function (event) {
        $(this).closest('.item').toggleClass('open');
    });

    /**
     * Google Maps
     */
    if($('.map-w-locations').length > 0) {
        loadMapsAPI(function() {
            $('.map-w-locations').each(function () {
                new Map($(this));
            });
        });
    }
});
