import $        from 'jquery';

// Must use CommonJS style require to pass $ to fancybox
var fancybox    = require('fancybox')($);

/**
 * Modals
 */

export default function modals () {

    $('.modal').fancybox();

}
