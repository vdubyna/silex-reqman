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
    }

    private $databaseTester;

    public function getConnection()
    {
        $pdo = new \PDO('mysql:dbname=test_reqman;host=localhost', 'root', '');

        return $this->createDefaultDBConnection($pdo);
    }

    protected function getDataSet()
    {
        $dataSet = new \PHPUnit_Extensions_Database_DataSet_YamlDataSet(dirname(__FILE__) . "/../fixtures/data.yml");

        return $dataSet;
    }


    /** @BeforeScenario */
    public function before($event)
    {
        $this->databaseTester = null;

        $setUpOperation = new PHPUnit_Extensions_Database_Operation_Composite(array(
            new PHPUnit_Extensions_Database_Operation_MySQL55Truncate(true),
            PHPUnit_Extensions_Database_Operation_Factory::INSERT()
        ));

        $this->getDatabaseTester()->setSetUpOperation($setUpOperation);
        $this->getDatabaseTester()->setDataSet($this->getDataSet());
        $this->getDatabaseTester()->onSetUp();
    }


    /** @AfterScenario */
    public function after($event)
    {
        $this->getDatabaseTester()->setTearDownOperation(PHPUnit_Extensions_Database_Operation_Factory::NONE());
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