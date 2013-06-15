<?php

require_once __DIR__.'/bootstrap.php';
// Init prod application with right configs
$app = require __DIR__.'/app.php';

$app->register(new \Knp\Provider\MigrationServiceProvider(), array(
    'migration.path' => __DIR__.'/../src/Resources/migration'
));

$app->register(new \Knp\Provider\ConsoleServiceProvider(), array(
    'console.name'              => 'Reqman Application',
    'console.version'           => '1.0.0',
    'console.project_directory' => __DIR__ . '/..'
));

$console = $app['console'];

$console->run();