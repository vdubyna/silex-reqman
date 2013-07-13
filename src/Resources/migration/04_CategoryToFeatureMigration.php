<?php

namespace Migration;

use Knp\Migration\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class CategoryToFeatureMigration extends AbstractMigration
{
    public function schemaUp(Schema $schema)
    {
        $table = $schema->createTable('category_to_feature');
        $table->addColumn('id', 'integer',
            array(
                 'unsigned'      => true,
                 'autoincrement' => true
            ));
        $table->addColumn('category_id', 'integer', array('unsigned' => true));
        $table->addColumn('feature_id', 'integer', array('unsigned' => true));
        $table->setPrimaryKey(array('id'));
        $table->addForeignKeyConstraint(
            $schema->getTable('category'),
            array('category_id'),
            array('id'),
            array('onDelete' => 'CASCADE')
        );
        $table->addForeignKeyConstraint(
            $schema->getTable('feature'),
            array('feature_id'),
            array('id'),
            array('onDelete' => 'CASCADE')
        );
    }

    public function getMigrationInfo()
    {
        return 'Added feature to category table';
    }
}