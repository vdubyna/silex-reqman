<?php

$app->mount('/project', new Reqman\ProjectBundle\Controller\ProjectController());

$app->get('/', function () {
    return "Welcome To Reqman API";
});
