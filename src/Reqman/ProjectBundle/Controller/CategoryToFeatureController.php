<?php

namespace Reqman\ProjectBundle\Controller;

use Silex\Application;
use Silex\Route;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;


class CategoryToFeatureController implements ControllerProviderInterface
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

        $controller->get("/", function($projectId, $categoryId) use ($app, $dbAdapter) {
            $features = $dbAdapter->fetchAll(
                "SELECT f.*, c_to_f.category_id
                 FROM category_to_feature AS c_to_f
                    LEFT JOIN feature as f
                        ON c_to_f.feature_id = f.id
                    WHERE c_to_f.category_id = {$categoryId}
                        AND f.project_id = {$projectId}"
            );

            return $app->json($features);
        });

        $controller->get("/{id}", function($projectId, $categoryId, $id) use ($app, $dbAdapter) {
            $feature = $dbAdapter->fetchAssoc(
                "SELECT f.*, c_to_f.category_id
                 FROM category_to_feature AS c_to_f
                    LEFT JOIN feature as f
                        ON c_to_f.feature_id = f.id
                    WHERE c_to_f.category_id = {$categoryId}
                        AND f.project_id = {$projectId}
                        AND f.id = {$id}");
            $statusCode = ($feature) ? 200 : 404;

            return $app->json($feature, $statusCode);
        });

        $controller->delete("/{id}", function($categoryId, $id) use ($app, $dbAdapter) {
            return $app->json($dbAdapter->delete('category_to_feature',
                array('feature_id' => $id, 'category_id' => $categoryId)));
        });

        return $controller;
    }
}
