import $        from 'jquery';
import slick    from 'slick-carousel';

/**
 * Sliders
 */

export default function sliders () {

    // Brand Window Slider
    $('.brand-window-slider .slides').slick();

    // Text slider
    $('.text-slider .slides').slick();

    // Carousel 4-Up
    $('.carousel-4-up .carousel').slick({
        arrows: false,
        dots: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4,
                }
            }
        ]
    });

    // CTA w/Multimedia & Slider gallery
    $('.cta-w-multimedia .photo-gallery, .slider-gallery .photo-gallery').slick({
        adaptiveHeight: true
    });

    $('.testimonial .slides').slick({
        adaptiveHeight: true,
        arrows: false,
        dots: true
    });
}
