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

    protected function sendRequest($url, $method = 'GET', $data = null)
    {
        // Configuration de la requête cURL
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }

        // Exécution de la requête
        $response = curl_exec($ch);

        // Vérification des erreurs
        if ($response === false) {
            // Erreur lors de l'exécution de la requête cURL
            $error = curl_error($ch);
            curl_close($ch);
            return false;
        }

        // Fermeture de la connexion cURL
        curl_close($ch);

        // Décodage de la réponse JSON
        $decoded_response = json_decode($response, true);

        return $decoded_response;
    }

    protected function validateToken()
    {
        // URL de l'endpoint de validation du token
        $url = $this->config['validate_token_url'];

        // Données à envoyer dans la requête
        $data = array(
            'token' => $this->token,
        );

        // Envoi de la requête
        $response = $this->sendRequest($url, 'POST', $data);

        // Vérification de la validité du token
        return isset($response['valid']) ? $response['valid'] : false;
    }

    protected function getUserIdFromToken()
    {
        // URL de l'endpoint pour récupérer l'ID de l'utilisateur à partir du token
        $url = $this->config['user_from_token_url'];

        // Données à envoyer dans la requête
        $data = array(
            'token' => $this->token,
        );

        // Envoi de la requête
        $response = $this->sendRequest($url, 'POST', $data);

        // Récupération de l'ID de l'utilisateur
        return isset($response['id']) ? $response['id'] : null;
    }

    protected function unauthorized()
    {
        http_response_code(401);
        header('WWW-Authenticate: Basic realm="Restricted Area"');
        echo json_encode(['error' => '401 Unauthorized'], JSON_PRETTY_PRINT);
        die();
    }
}