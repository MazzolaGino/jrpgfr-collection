<?php

require_once(__DIR__ . '/../vendor/autoload.php');

use MyCollectionApi\Core\Database;
use MyCollectionApi\Core\Path;
use MyCollectionApi\Api\Utils\JRPGDataImporter;

$path = new Path('dev', __DIR__ . '/../');
$config = json_decode(file_get_contents($path->getCongigPath()), true);
$db = new Database($path);


$json = json_decode(file_get_contents('php://input'), true);

if (isset($json['controller']) && isset($json['action']) && isset($json['params'])) {

    $endpoint = '\\MyCollectionApi\\Api\\Endpoint\\' . $json['controller'];

    if($json['params']['token']) {

        $ept = new $endpoint($config, $db->getConnection(), $json['params']['token']);

        unset($json['params']['token']);

        $act = $json['action'];
    
        echo $ept->$act(...$json['params']);

    } else {
        http_response_code(401);
        header('WWW-Authenticate: Basic realm="Restricted Area"');
        echo json_encode(['error' => '401 Unauthorized'], JSON_PRETTY_PRINT);
        exit();
    }

   
}
