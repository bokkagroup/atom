<?php

namespace CatalystWP\Atom\models\organisms;

use CatalystWP\Nucleus\models\Menu as Menu;

class Header extends \CatalystWP\Nucleus\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->logo = get_stylesheet_directory_uri() . '/assets/build/img/logo.gif';
    }
}
