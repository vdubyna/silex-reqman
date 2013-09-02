Silex Reqman Application
======================

[![Build Status](https://travis-ci.org/vdubyna/silex-reqman.png?branch=master)](https://travis-ci.org/vdubyna/silex-reqman)

Description
-----------

This is a single page application for managing requirements and it provides a possibility to connect requirements in
the `Reqman` with issues in the redmine. Also we plan to generate reports based on the quality control check results.

### Main terms:

 * __Project__ is a group of requirements. And reports are stored in the context of project.
 * __Feature__ is additional `tag` to group requirements.
 * __User Story__ is a structural cell of the requirements list.
 * __Test Case__ is a scenario for the `User Story` which aims to test specific functionality of the application
 * __Step__ is a part of the `Test Case` and could be shared between different features.

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
grunt test
```

### Migrations

To write a new db migration you have to do next

 * Add file to folder `src/Resources/migration` 
 * The name of the file should be named according to the next pattern `NUM_NAMEMigration.php`
where `NUM` is an increment number 01, 02, 03 etc. `NAME` is a camel case name of migration.
Example: `02_FeatureMigration.php`
[Documentation](https://github.com/KnpLabs/MigrationServiceProvider)

After add migration to the folder, you have to migrate.

```bash
php app/console.php knp:migration:migrate
```

### Redmine api

How to use redmine api service see examples there
[Redmine Api](https://github.com/kbsali/php-redmine-api)

 

Tests
-----

```bash
#run selenium server to listen before running tests
./bin/behat
```

[Mink and Behat](http://docs.behat.org/cookbook/behat_and_mink.html)

[angular js](http://www.youtube.com/watch?v=i9MHigUZKEM)



What you need to know
---------------------
 * [PHP][1]
 * [Silex][2]
 * [Doctrine][3]
 * [Composer][4]
 * [Backbone][5]
 * [PHPUnit & DBUnit][6] (Optional)
