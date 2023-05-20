<?php 

namespace MyCollectionApi\Api\Utils;

class JRPGDataImporter
{
    private $clientId;
    private $accessToken;
    private $url = 'https://api.igdb.com/v4/games';

    public function __construct($clientId, $accessToken)
    {
        $this->clientId = $clientId;
        $this->accessToken = $accessToken;
    }

    public function searchJRPG($searchTerm)
    {
        $fields = 'fields name, summary, url, genres.name, first_release_date, involved_companies.company.name, platforms.name, cover.url;';
        $query = 'search "' . $searchTerm . '";';

        $requestData = [
            'method' => 'POST',
            'headers' => [
                'Client-ID' => $this->clientId,
                'Authorization' => 'Bearer ' . $this->accessToken,
                'Accept' => 'application/json'
            ],
            'body' => $fields . $query
        ];

        return $this->sendRequest($this->url, $requestData);
    }

    private function sendRequest($url, $requestData)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData['body']);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->buildHeaders($requestData['headers']));
        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    private function buildHeaders($headers)
    {
        $headerArray = [];
        foreach ($headers as $key => $value) {
            $headerArray[] = $key . ': ' . $value;
        }
        return $headerArray;
    }

}

