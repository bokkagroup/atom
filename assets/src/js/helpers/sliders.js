import $        from 'jquery';
import slick    from 'slick-carousel';

/**
 * Sliders
 */

export default function sliders () {

    // Brand Window Slider
    $('.brand-window-slider .slides').slick();

    // Carousel 4-Up
    $('.carousel-4-up .carousel').slick({
        arrows: false,
        dots: true,
        slidesToScroll: 4,
        slidesToShow: 4
    });

    // CTA w/Multimedia
    $('.cta-w-multimedia .photo-gallery').slick({
        adaptiveHeight: true
    });
}
