import $            from 'jquery';
import tabs         from './helpers/tabs';
import modals       from './helpers/modals';
import sliders      from './helpers/sliders';
import mobileMenu   from './organisms/mobileMenu';

$(document).ready(() => {

    sliders();
    modals();
    tabs();

    // Initialize header mobile menu
    let headerMenu = new mobileMenu('.organism.header');

    /**
     * Accordion
     */
    $('.accordion .title').on('click', function (event) {
        $(this).closest('.item').toggleClass('open');
    });

});
