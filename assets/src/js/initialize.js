import $        from 'jquery';
import slick    from 'slick-carousel';

$(document).ready(() => {

    /**
     * Sliders
     */
    $('.brand-window-slider .slides').slick({
        dots: false
    });

    /**
     * Accordion
     */
    $('.accordion .title').on('click', function (event) {
        $(this).closest('.item').toggleClass('open');
    });
});
