<?php

$app = new Silex\Application();

$app['debug'] = true;

// Register services
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
  'db.options' => array(
      'driver'   => 'pdo_mysql',
      'dbname'   => 'test_reqman',
      'host'     => 'localhost',
      'user'     => 'root',
      'password' => ''
  ),
));

//Controllers, todo move controllers to own object|file
$app->mount('/project', new Reqman\ProjectBundle\Controller\ProjectController());

$app->get('/', function () {
    return "Welcome To Reqman API";
});

return $app;
