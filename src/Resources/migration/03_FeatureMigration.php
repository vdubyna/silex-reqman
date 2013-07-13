<?php

namespace Migration;

use Knp\Migration\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class FeatureMigration extends AbstractMigration
{
    public function schemaUp(Schema $schema)
    {
        $table = $schema->createTable('feature');
        $table->addColumn('id', 'integer',
            array(
               'unsigned'      => true,
               'autoincrement' => true
            ));
        $table->addColumn('name', 'string');
        $table->addColumn('description', 'string');
        $table->addColumn('project_id', 'integer', array('unsigned' => true));
        $table->setPrimaryKey(array('id'));
        $table->addForeignKeyConstraint(
            $schema->getTable('project'),
            array('project_id'),
            array('id'),
            array('onDelete' => 'CASCADE')
        );
    }

    public function getMigrationInfo()
    {
        return 'Added feature table';
    }
}