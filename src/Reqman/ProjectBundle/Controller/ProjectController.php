<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class ProjectController implements ControllerProviderInterface
{
    /**
     * Define routes
     *
     * @param Application $app
     * @return ControllerCollection
     */
    public function connect(Application $app) {

        $controller = new ControllerCollection(new Route());

        $controller->get("/", function() use ($app) {
            $results = '[
          {
              "name":  "project 1",
              "description": "Description project 1"
          },
          {
              "name":  "project 2",
              "description": "Description project 2"
          },
          {
              "name":   "project 3",
              "description":  "Description project 3"
          }
      ]';

            return $results;
        });

        return $controller;
    }
}
