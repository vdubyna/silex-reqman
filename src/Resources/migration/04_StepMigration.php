<?php

namespace Migration;

use Knp\Migration\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class StepMigration extends AbstractMigration
{
    public function schemaUp(Schema $schema)
    {
        $table = $schema->createTable('step');
        $table->addColumn('id', 'integer',
            array(
               'unsigned'      => true,
               'autoincrement' => true
            ));
        $table->addColumn('name', 'string');
        $table->addColumn('description', 'string');
        $table->addColumn('test_case_id', 'integer', array('unsigned' => true));
        $table->setPrimaryKey(array('id'));
        $table->addForeignKeyConstraint(
            $schema->getTable('test_case'),
            array('test_case_id'),
            array('id'),
            array('onDelete' => 'CASCADE')
        );
    }

    public function getMigrationInfo()
    {
        return 'Add step table';
    }
}