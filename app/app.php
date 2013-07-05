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

$app->mount('/project', new \Reqman\ProjectBundle\Controller\ProjectController());

$app->get('/', function () {
    return "Welcome To Reqman API";
});

return $app;
