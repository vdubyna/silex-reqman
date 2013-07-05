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

        /** @var ControllerCollection $controller */
        $controller = $app['controllers_factory'];

        /** @var \Doctrine\DBAL\Connection $dbAdapter */
        $dbAdapter = $app['db'];

        $controller->get("/", function() use ($app, $dbAdapter) {
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `project`"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->fetchAssoc("SELECT * FROM `project` WHERE `project_id` = '{$id}'"));
        });

        $controller->post("/", function(Request $request) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->insert('project', $params);
            $id = $params['project_id'];
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `project` WHERE `project_id` = '{$id}'");

            return $app->json($record);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('project', $params, array('project_id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `project` WHERE `project_id` = '{$id}'");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('project', array('project_id' => $id)));
        });

        return $controller;
    }
}
