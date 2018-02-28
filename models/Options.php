<?php

namespace CatalystWP\Atom\models;

class Options
{
    /**
     * Setup array of options
     */
    public static function setOptions()
    {
        if (!function_exists('get_field')) {
            return;
        }

        $options = get_fields('option');
        return $options;
    }
}
