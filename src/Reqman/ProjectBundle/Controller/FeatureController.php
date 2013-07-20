<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class FeatureController implements ControllerProviderInterface
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
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `feature` WHERE `project_id` = '{$projectId}'"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            $feature = $dbAdapter->fetchAssoc("SELECT * FROM `feature` WHERE `id` = '{$id}'");
            $statusCode = ($feature) ? 200 : 404;
            return $app->json($feature, $statusCode);
        });

        $controller->post("/", function(Request $request) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->insert('feature', $params);
            $id = $dbAdapter->lastInsertId();
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `feature` WHERE `id` = '{$id}'");

            return $app->json($record, 201);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('feature', $params, array('id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `feature` WHERE `id` = '{$id}'");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('feature', array('id' => $id)));
        });

        $controller->post("/{id}/category", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $params['feature_id'] = $id;
            $categoryId = $params['category_id'];
            $dbAdapter->insert('category_to_feature', $params);
            $record = $dbAdapter->fetchAssoc("
                 SELECT f.*, c_to_f.category_id
                 FROM category_to_feature AS c_to_f
                    LEFT JOIN feature as f
                        ON c_to_f.feature_id = f.id
                    WHERE c_to_f.category_id = {$categoryId}
                        AND f.id = {$id}
            ");

            return $app->json($record, 201);
        });


        return $controller;
    }
}
