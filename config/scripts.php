<?php

/* ----------------------------------------------------------------------------------
Register Styles & Scripts
---------------------------------------------------------------------------------- */
//using callback style so both child & parent themes
//load their respective files without function name conflicts
add_action('wp_enqueue_scripts', function () {
    if (!is_admin()) {
        wp_register_script(
            'catalystwp-common',
            get_stylesheet_directory_uri() . '/assets/build/js/common.min.js',
            array(),
            null,
            true
        );

        wp_register_script(
            'catalystwp-initialize',
            get_template_directory_uri() . '/assets/build/js/initialize.min.js',
            array('catalystwp-common'),
            null,
            true
        );
        wp_register_style(
            'catalystwp-styles',
            get_template_directory_uri() . '/assets/build/css/main.css'
        );
    } // End if !is_admin()
}, 5);

/* ----------------------------------------------------------------------------------
Enqueue custom Styles & Scripts
---------------------------------------------------------------------------------- */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('jquery', false, array(), false, false);

    wp_enqueue_script('catalystwp-initialize');
    wp_enqueue_style('catalystwp-styles');
}, 100);

/* ----------------------------------------------------------------------------------
Enqueue Parent Styles & Scripts
---------------------------------------------------------------------------------- */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('catalystwp-initialize');
}, 50);

/* ----------------------------------------------------------------------------------
Enqueue MUST USE Styles & Scripts (loads before other scripts)
---------------------------------------------------------------------------------- */
add_action('wp_enqueue_scripts', function () {
    // prefer the child theme's common file
    // as to not load multiple copies of backbone & lodash
    if (!wp_script_is('catalystwp-common')) {
        wp_enqueue_script('catalystwp-common');
    }
}, 25);

/* ----------------------------------------------------------------------------------
Enqueue admin styles
---------------------------------------------------------------------------------- */
add_action('admin_enqueue_scripts', function () {
    wp_enqueue_style('admin-styles', get_template_directory_uri().'/assets/build/css/admin.css');
});
