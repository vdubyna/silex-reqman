<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class TestCaseController implements ControllerProviderInterface
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

        $controller->get("/", function($userStoryId) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `test_case` WHERE `user_story_id` = {$userStoryId}"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            $testCase = $dbAdapter->fetchAssoc("SELECT * FROM `test_case` WHERE `id` = {$id}");
            $statusCode = ($testCase) ? 200 : 404;
           return $app->json($testCase, $statusCode);
        });

        $controller->post("/", function(Request $request, $userStoryId) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $params['user_story_id'] = (isset($params['user_story_id'])) ? $params['user_story_id'] : $userStoryId;
            $dbAdapter->insert('test_case', $params);
            $id = $dbAdapter->lastInsertId();
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `test_case` WHERE `id` = {$id}");

            return $app->json($record, 201);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('test_case', $params, array('id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `test_case` WHERE `id` = {$id}");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('test_case', array('id' => $id)));
        });

        return $controller;
    }
}
