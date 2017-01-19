/**
 * Use this file to setup extra dependencies that aren't loaded via webpack config.
 * Generally used to include JS from the parent theme
 */

//Parent theme initialize
try {
    require('../../../../bokka-wp-theme/assets/src/js/initialize.js');
} catch (e) {
    /* continue regardless of error */
}