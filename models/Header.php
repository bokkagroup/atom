<?php

namespace CatalystWP\Theme\models;

use CatalystWP\MVC\models\Menu as Menu;

class Header extends \CatalystWP\MVC\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->logo = get_stylesheet_directory_uri() . '/assets/build/img/logo.gif';
    }
}
