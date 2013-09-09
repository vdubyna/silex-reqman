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
$app->mount('/project/{userStoryId}/issue', new \Reqman\ProjectBundle\Controller\IssueController());
$app->mount('/project/{projectId}/user-story', new \Reqman\ProjectBundle\Controller\UserStoryController());
$app->mount('/user-story/{userStoryId}/test-case', new \Reqman\ProjectBundle\Controller\TestCaseController());
$app->mount('/test-case/{testCaseId}/step', new \Reqman\ProjectBundle\Controller\StepController());

$app->get('/', function () {
    return "Welcome To Reqman API";
});

return $app;
