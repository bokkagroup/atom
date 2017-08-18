<?php

// This theme uses wp_nav_menu() in one location.
register_nav_menus(array(
    'primary' => esc_html__('Primary Nav', 'catalyst_wp_theme'),
    'auxiliary' => esc_html__('Auxiliary Nav', 'catalyst_wp_theme'),
    'footer' => esc_html__('Footer Nav', 'catalyst_wp_theme')
));
