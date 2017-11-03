import $            from 'jquery';
import tabs         from './helpers/tabs.js';
import modals       from './helpers/modals.js';
import sliders      from './helpers/sliders.js';

$(document).ready(() => {

    sliders();
    modals();
    tabs();

    /**
     * Accordion
     */
    $('.accordion .title').on('click', function (event) {
        $(this).closest('.item').toggleClass('open');
    });

});
