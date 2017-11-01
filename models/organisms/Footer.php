<?php

namespace CatalystWP\Theme\models;

use CatalystWP\MVC\models\Menu as Menu;

class Footer extends \CatalystWP\MVC\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->year = date('Y');
    }
}
