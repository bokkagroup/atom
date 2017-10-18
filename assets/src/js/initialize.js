import $            from 'jquery';
import modals       from './helpers/modals.js';
import sliders      from './helpers/sliders.js';

$(document).ready(() => {

     sliders();
     modals();

    /**
     * Accordion
     */
    $('.accordion .title').on('click', function (event) {
        $(this).closest('.item').toggleClass('open');
    });

});
