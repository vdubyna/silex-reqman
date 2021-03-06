<?php

namespace Migration;

use Knp\Migration\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class ProjectMigration extends AbstractMigration
{
    public function schemaUp(Schema $schema)
    {
        $projectTable = $schema->createTable('project');
        $projectTable->addColumn('id', 'integer',
            array(
               'unsigned'      => true,
               'autoincrement' => true
            ));
        $projectTable->addColumn('identifier', 'string');
        $projectTable->addColumn('name', 'string');
        $projectTable->addColumn('description', 'text', array('default' => null, 'notnull' => false));
        $projectTable->setPrimaryKey(array('id'));
        $projectTable->addUniqueIndex(array('identifier'));
    }

    public function getMigrationInfo()
    {
        return 'Added project table';
    }
}