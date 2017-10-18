import $        from 'jquery';
import slick    from 'slick-carousel';

/**
 * Sliders
 */

export default function sliders () {

    $('.brand-window-slider .slides').slick();

    $('.carousel-4-up .carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 4
    });

}
