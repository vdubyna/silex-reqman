<?php

use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

use Behat\MinkExtension\Context\MinkContext;
use Behat\CommonContexts\WebApiContext;
use Behat\CommonContexts\DoctrineFixturesContext;

class FeatureContext extends BehatContext
{
    public function __construct(array $parameters)
    {
        $this->useContext('mink', new MinkContext);
        $this->useContext('api', new WebApiContext($parameters['base_api_url']));
        $this->useContext('doctrine_fixtures_context', new DoctrineFixturesContext());
    }

    private $databaseTester;

    public function getConnection()
    {
        $database = 'imebase_test';
        $pdo      = new \PDO('mysql:dbname=test_reqman;host=localhost', 'root', '');

        return $this->createDefaultDBConnection($pdo, $database);
    }

    protected function getDataSet()
    {
        $dataSet = new \PHPUnit_Extensions_Database_DataSet_YamlDataSet(dirname(__FILE__) . "/../api/fixtures/project.yml");

        return $dataSet;
    }


    /** @BeforeScenario */
    public function before($event)
    {
        $this->databaseTester = null;
        $this->getDatabaseTester()->setSetUpOperation($this->getSetUpOperation());
        $this->getDatabaseTester()->setDataSet($this->getDataSet());
        $this->getDatabaseTester()->onSetUp();
    }


    /** @AfterScenario */
    public function after($event)
    {
        $this->getDatabaseTester()->setTearDownOperation($this->getTearDownOperation());
        $this->getDatabaseTester()->setDataSet($this->getDataSet());
        $this->getDatabaseTester()->onTearDown();

        /**
         * Destroy the tester after the test is run to keep DB connections
         * from piling up.
         */
        $this->databaseTester = null;
    }

    protected function getDatabaseTester()
    {
        if (empty($this->databaseTester)) {
            $this->databaseTester = $this->newDatabaseTester();
        }

        return $this->databaseTester;
    }

    protected function newDatabaseTester()
    {
        return new PHPUnit_Extensions_Database_DefaultTester($this->getConnection());
    }

    protected function getSetUpOperation()
    {
        return PHPUnit_Extensions_Database_Operation_Factory::CLEAN_INSERT();
    }

    protected function getTearDownOperation()
    {
        return PHPUnit_Extensions_Database_Operation_Factory::NONE();
    }

    protected function createDefaultDBConnection(PDO $connection, $schema = '')
    {
        return new PHPUnit_Extensions_Database_DB_DefaultDatabaseConnection($connection, $schema);
    }


    /**
     * Checks that response body contains specific text.
     *
     * @param string $text
     *
     * @Then /^(?:the )?response should be equal "([^"]*)"$/
     */
    public function theResponseShouldBeEqual($text)
    {
        assertEquals($text, $this->browser->getLastResponse()->getContent());
    }
}