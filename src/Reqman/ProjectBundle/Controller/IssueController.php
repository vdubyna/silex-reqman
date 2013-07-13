<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class IssueController implements ControllerProviderInterface
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

        $redmine = $app['redmine-api'];

        $controller->get("/", function() use ($app, $dbAdapter, $redmine) {

            $projects = $redmine->api('project')->all(array(
                'limit' => 100
            ));

            $result = array();
            foreach ($projects['issues'] as $project) {
                $result[] = array(
                    'id' => $project['id'],
                    'project_id' => $project['identifier'],
                    'name' => $project['name'],
                    'description' => $project['description'],
                );
            }

            return $app->json($result);
        });

        $controller->get("/{id}", function($id) use ($app, $dbAdapter, $redmine) {

            $project = $redmine->api('project')->show($id);
            $result = array(
                'id' => $project['project']['id'],
                'project_id' => $project['project']['identifier'],
                'name' => $project['project']['name'],
                'description' => $project['project']['description'],
            );

//            return $app->json($dbAdapter->fetchAssoc("SELECT * FROM `project` WHERE `project_id` = '{$id}'"));
            return $app->json($result);
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
