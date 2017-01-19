<?php
/**
 * bokka_wp_theme functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package bokka_wp_theme
 */
add_action('after_setup_theme',
    /**
     * Sets up theme defaults and registers support for various WordPress features and loads our various actions.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */

    function()
    {

        include_once 'config.php';
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on bokka_wp_theme, use a find and replace
         * to change 'bokka_wp_theme' to the name of your theme in all the template files.
         */
        load_theme_textdomain('bokka_wp_theme', get_template_directory() . '/languages');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(array(
            'primary' => esc_html__('Primary', 'bokka_wp_theme'),
        ));

        //auto load scripts
        //change to get_stylesheet_directory for child theme
        foreach (glob(get_template_directory() . "/config/*.php") as $filename) {
            require_once($filename);
        }
        foreach (glob(get_template_directory() . "/hooks/*.php") as $filename) {
            require_once($filename);
        }

        /**---------------------
         * CUSTOM INCLUDES BELOW *
         ------------------------*/
    },
1);
remove_filter('template_redirect', 'redirect_canonical');
