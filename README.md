Silex Reqman Application
======================

[![Build Status](https://travis-ci.org/vdubyna/silex-reqman.png?branch=master)](https://travis-ci.org/vdubyna/silex-reqman)

Description
-----------

This is a single page application for managing requirements and it provides a possibility to connect requirements in
the `Reqman` with issues in the redmine. Also we plan to generate reports based on the quality control check results.

### Main terms:

 * __Project__ is a group of requirements. And reports are stored in the context of project.
 * __Category__ is additional `tag` to group requirements.
 * __Feature__ is a structural cell of the requirements list.
 * __Test Case__ is a scenario for the `feature` which aims to test specific functionality of the application
 * __Step__ is a part of the `Test case` and could be shared between different features.

### Functionality
 


Install
-------

```bash
# Install php environment
composer install
# Apply migrations
php app/console.php knp:migration:migrate
```

```bash
# Install web environment
jam install
```

### Migrations

To write a new db migration you have to do next

 * Add file to folder `src/Resources/migration` 
 * The name of the file should be named according to the next pattern `NUM_NAMEMigration.php`
where `NUM` is an increment number 01, 02, 03 etc. `NAME` is a camel case name of migration.
Example: `02_FeatureMigration.php`

After add migration to the folder, you have to migrate.

```bash
php app/console.php knp:migration:migrate
```

 

What you need to know
---------------------
 * [PHP][1]
 * [Silex][2]
 * [Doctrine][3]
 * [Composer][4]
 * [Backbone][5]
 * [PHPUnit & DBUnit][6] (Optional)

Installation
------------

You can do the conventional way which is clone this repository, or the easiest way, you can just directly download composer (if you don't have it yet) here:

    http://getcomposer.org/download/

After the download is complete, you can start installing the required package by running this command:

``` sh
$ php composer.phar create-project makusu/silex-skeleton-rest
```

You can add option "--dev" behind if you want to have the controller test working properly.

Tests
-----

For this test, you need to put this sql command in MySQL.

``` mysql
CREATE DATABASE `tododb`;

CREATE DATABASE `todotestdb`;

CREATE TABLE `tododb`.`item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `todotestdb`.`item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `tododb`.`item` values
(null, "Download silex-skeleton-rest.", "2013-01-01 00:00:00"),
(null, "Utilize the skeleton so I can use it for my project.", "2013-01-06 19:00:00");

insert into `todotestdb`.`item` values
(null, "Download silex-skeleton-rest.", "2013-01-01 00:00:00"),
(null, "Utilize the skeleton so I can use it for my project.", "2013-01-06 19:00:00");
```

Why do we need to have 2 same database?
It's not compulsory. The idea is just to differentiate between our development and our test database environment.

Change the configurations to suit your environment. Don't worry, it's **simple**.

 * app/config/dev.php
 * app/config/prod.php
 * app/config/test.php
 * Copy app/phpunit.xml.dist into app/phpunit.xml, and take a look at the <php> environment at the bottom of the file
 * Your server configuration must be pointing to: web/index.php (prod) and web/index_dev.php (dev)

If everything has been installed & configured properly, try to put this url in your browser:

    http://silex-skeleton-rest/item

You should see this result:

``` json
[
    {
        id: "1",
        name: "Download silex-skeleton-rest.",
        created: "2013-01-01 00:00:00"
    },
    {
        id: "2",
        name: "Utilize the skeleton so I can use it for my project.",
        created: "2013-01-06 19:00:00"
    }
]
```

Try also put this in your url:

    http://silex-skeleton-rest/item/1
    http://silex-skeleton-rest/item/2

If you can see a nice json result out of it, you can try to use http method POST, PUT and DELETE to manipulate the database using your api.

Finally, for testing purposes, you can just run this command at your main directory:

``` sh
$ phpunit -c app/
```

Resources
---------

[1]: http://php.net/
[2]: http://silex.sensiolabs.org/
[3]: http://www.doctrine-project.org/
[4]: http://getcomposer.org/
[5]: http://backbonejs.org/
[6]: http://www.phpunit.de/
