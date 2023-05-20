<?php

namespace MyCollectionApi\Core;

use MyCollectionApi\Core\Path;

class Database {

    private \PDO $db;

    private array $cnf;

    public function __construct(Path $path) {

        $this->cnf = json_decode(\file_get_contents($path->getCongigPath()), true);

        // Connexion à la base de données MySQL
        $servername = $this->cnf['dbhost'];
        $username = $this->cnf['dbuser'];
        $password = $this->cnf['dbpass'];
        $dbname = $this->cnf['dbname'];;

        try {
            $this->db = new \PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $this->db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            die("Connexion à la base de données échouée : " . $e->getMessage());
        }
    }

    public function getConnection(): \PDO
    {
        return $this->db;
    }

}