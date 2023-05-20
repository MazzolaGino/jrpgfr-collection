<?php

namespace MyCollectionApi\Api\Endpoint;

use MyCollectionApi\Api\Utils\JRPGDataImporter;

class BaseEndpoint
{

    protected JRPGDataImporter $gameApi;
    protected \PDO $db;
    protected array $config;

    protected string $token;


    public function __construct(array $config, \PDO $db, string $token)
    {
        $this->config = $config;
        $this->token = $token;
        $this->gameApi = new JRPGDataImporter($config['client_id'], $config['access_token']);
        $this->db = $db;
    }

    protected function validateToken(): bool
    {

        $endpoint = $this->config['validate_token_url'] . '1';
        
        $headers = array(
            'Authorization: Bearer ' . $this->token
        );


        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $endpoint);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($curl);

        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        if ($httpCode === 200) {
            return true;
        } else {
            http_response_code(401);
            header('WWW-Authenticate: Basic realm="Restricted Area"');
            echo json_encode(['error' => '401 Unauthorized'], JSON_PRETTY_PRINT);
            die();
        }
    }
}
