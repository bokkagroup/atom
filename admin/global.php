<?php
/**
 * Sets admin color scheme based on environment
 * @param $color_scheme
 * @return string
 */
function update_user_option_admin_color($color_scheme)
{
    if (BOKKA_ENV == 'local') {
        $color_scheme = 'ocean';
    }

    if (BOKKA_ENV == 'staging') {
        $color_scheme = 'ectoplasm';
    }

    if (BOKKA_ENV == 'production') {
        $color_scheme = 'sunrise';
    }

    return $color_scheme;
}

add_filter('get_user_option_admin_color', 'update_user_option_admin_color', 5);
