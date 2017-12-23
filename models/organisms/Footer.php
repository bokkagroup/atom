<?php

namespace CatalystWP\Theme\models;

use CatalystWP\Nucleus\models\Menu as Menu;

class Footer extends \CatalystWP\Nucleus\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->year = date('Y');
    }
}
