<?php

namespace BokkaWP\Theme\controllers;

class OrganismsController extends \BokkaWP\MVC\Controller
{
    public function initialize()
    {
        $this->model->data['organisms'] = $this->model->data;
        $this->view->display($this->model->data);
    }
}
