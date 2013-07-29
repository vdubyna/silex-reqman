<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class UserStoryController implements ControllerProviderInterface
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
            return $app->json($dbAdapter->fetchAll("SELECT * FROM `user_story` WHERE `project_id` = '{$projectId}'"));
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter) {
            $userStory = $dbAdapter->fetchAssoc("SELECT * FROM `user_story` WHERE `id` = '{$id}'");
            $statusCode = ($userStory) ? 200 : 404;
            return $app->json($userStory, $statusCode);
        });

        $controller->post("/", function(Request $request, $projectId) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $params['project_id'] = $projectId;
            $dbAdapter->insert('user_story', $params);
            $id = $dbAdapter->lastInsertId();
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `user_story` WHERE `id` = '{$id}'");

            return $app->json($record, 201);
        });

        $controller->put("/{id}", function(Request $request, $id) use ($app, $dbAdapter) {
            $params = $request->request->all();
            $dbAdapter->update('user_story', $params, array('id' => $id));
            $record = $dbAdapter->fetchAssoc("SELECT * FROM `user_story` WHERE `id` = '{$id}'");

            return $app->json($record);
        });

        $controller->delete("/{id}", function($id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('user_story', array('id' => $id)));
        });

        return $controller;
    }
}
