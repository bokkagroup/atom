<?php

namespace CatalystWP\Atom\models\organisms;

use CatalystWP\Nucleus\models\Menu as Menu;

class Footer extends \CatalystWP\Nucleus\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->year = date('Y');
    }
}
