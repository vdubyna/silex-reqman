<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class CategoryController implements ControllerProviderInterface
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

        $controller->get("/", function($projectId) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `category` WHERE `project_id` = '{$projectId}'"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            $category = $dbAdapter->fetchAssoc("SELECT * FROM `category` WHERE `id` = '{$id}'");
            $statusCode = ($category) ? 200 : 404;
           return $app->json($category, $statusCode);
        });

        $controller->post("/", function(Request $request) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->insert('category', $params);
            $id = $dbAdapter->lastInsertId();
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `category` WHERE `id` = '{$id}'");

            return $app->json($record, 201);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('category', $params, array('id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `category` WHERE `id` = '{$id}'");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('category', array('id' => $id)));
        });

        return $controller;
    }
}
