<?php

ini_set('display_errors', 0);

require_once __DIR__.'/../app/bootstrap.php';

$app = require __DIR__.'/../app/app.php';
require __DIR__.'/../app/config/prod.php';
require __DIR__.'/../app/controller.php';
$app->run();
