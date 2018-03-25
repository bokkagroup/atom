import $            from 'jquery';
import tabs         from './helpers/tabs.js';
import modals       from './helpers/modals.js';
import sliders      from './helpers/sliders.js';
import maps         from './helpers/maps.js';

window.catalystwp = {};

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
});
