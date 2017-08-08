<?php

// This theme uses wp_nav_menu() in one location.
register_nav_menus(array(
    'primary' => esc_html__('Primary Nav', 'bokka_wp_theme'),
    'auxiliary' => esc_html__('Auxiliary Nav', 'bokka_wp_theme'),
    'footer' => esc_html__('Footer Nav', 'bokka_wp_theme')
));
