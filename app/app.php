<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new \Silex\Application();

$app['debug'] = true;

// Register services
$app->register(new \Silex\Provider\DoctrineServiceProvider(), array(
  'db.options' => array(
      'driver'   => 'pdo_mysql',
      'dbname'   => 'test_reqman',
      'host'     => 'localhost',
      'user'     => 'root',
      'password' => ''
  ),
));

$app['redmine-api'] = $app->share(function () {
    return new Redmine\Client('https://tracker.speroteck.com/',
        '170269f6c3899053805f1ed1861c606175205390');
});

$app->mount('/project', new \Reqman\ProjectBundle\Controller\ProjectController());
$app->mount('/project/{projectId}/issue', new \Reqman\ProjectBundle\Controller\IssueController());
$app->mount('/project/{projectId}/feature', new \Reqman\ProjectBundle\Controller\FeatureController());
$app->mount('/project/{projectId}/category', new \Reqman\ProjectBundle\Controller\CategoryController());
$app->mount('/project/{projectId}/category/{categoryId}/feature',
    new \Reqman\ProjectBundle\Controller\CategoryToFeatureController());
$app->mount('/project/{projectId}/feature/{featureId}/step',
    new \Reqman\ProjectBundle\Controller\StepController());

$app->get('/', function () {
    return "Welcome To Reqman API";
});

return $app;
