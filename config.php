<?php
/**
 * Define theme location
 */
define('CATALYST_WP_THEME_DIR', get_bloginfo('template_directory'));

/**
 * Defines Environment Variables for theme
 */
if (!defined('CATALYST_WP_ENV') && isset($_SERVER) && $_SERVER['HTTP_HOST']) {
    $host = $_SERVER['HTTP_HOST'];

    if (strpos($host, 'local') !== false || strpos($host, 'dev') !== false) {
        define('CATALYST_WP_ENV', "local");
    } elseif (strpos($host, 'staging') !== false) {
        define('CATALYST_WP_ENV', "staging");
    } else {
        define('CATALYST_WP_ENV', "production");
    }
}