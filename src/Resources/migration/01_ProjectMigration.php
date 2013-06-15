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
        $projectTable->addColumn('project_id', 'string');
        $projectTable->addColumn('name', 'string');
        $projectTable->addColumn('description', 'text');
        $projectTable->setPrimaryKey(array('id'));
        $projectTable->addUniqueIndex(array('project_id'));
    }

    public function getMigrationInfo()
    {
        return 'Added project table';
    }
}