<?php
/**
 * Sets admin color scheme based on environment
 * @param $color_scheme
 * @return string
 */
function update_user_option_admin_color()
{

    $color_scheme = 'light';

    if (CATALYST_WP_ENV == 'local') {
        $color_scheme = 'ocean';
    }

    if (CATALYST_WP_ENV == 'staging') {
        $color_scheme = 'ectoplasm';
    }

    if (CATALYST_WP_ENV == 'production') {
        $color_scheme = 'sunrise';
    }

    update_user_meta(get_current_user_id(), 'admin_color', $color_scheme);

}
