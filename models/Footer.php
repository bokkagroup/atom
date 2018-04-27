<?php

namespace CatalystWP\Atom\models;

use CatalystWP\Nucleus\models\Menu as Menu;
use CatalystWP\Atom\models\Options as Options;

class Footer extends \CatalystWP\Nucleus\Model
{
    public function initialize()
    {
        $this->menu = new Menu('primary');
        $this->year = date('Y');
        $this->options = Options::setOptions();
    }
}
