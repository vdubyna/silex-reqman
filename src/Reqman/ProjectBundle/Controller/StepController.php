<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class StepController implements ControllerProviderInterface
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

        $controller->get("/", function($featureId) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `step` WHERE `feature_id` = '{$featureId}'"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            $step = $dbAdapter->fetchAssoc("SELECT * FROM `step` WHERE `id` = '{$id}'");
            $statusCode = ($step) ? 200 : 404;
           return $app->json($step, $statusCode);
        });

        $controller->post("/", function(Request $request, $featureId) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $params['feature_id'] = $featureId;
            $dbAdapter->insert('step', $params);
            $id = $dbAdapter->lastInsertId();
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `step` WHERE `id` = '{$id}'");

            return $app->json($record, 201);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('step', $params, array('id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `step` WHERE `id` = '{$id}'");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('step', array('id' => $id)));
        });

        return $controller;
    }
}
