<?php

namespace CatalystWP\Theme\controllers;

class OrganismsController extends \CatalystWP\MVC\Controller
{
    public function initialize()
    {
        $this->model->data['organisms'] = $this->model->data;
        $this->view->display($this->model->data);
    }
}