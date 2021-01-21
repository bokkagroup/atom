<?php

namespace CatalystWP\Atom\controllers;

class OrganismsController extends \CatalystWP\Nucleus\Controller
{
    public function initialize()
    {
        $this->model->data['organism'] = $this->model->data;
        $this->view->display($this->model->data);
    }
}
