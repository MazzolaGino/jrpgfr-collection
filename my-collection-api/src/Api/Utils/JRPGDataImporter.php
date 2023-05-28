<?php

namespace MyCollectionApi\Api\Utils;

class JRPGDataImporter
{
    private $clientId;
    private $accessToken;
    private $url = 'https://api.igdb.com/v4/games';

    private $companies = 'https://api.igdb.com/v4/involved_companies';
    private $genres = 'https://api.igdb.com/v4/genres';
    private $platforms = 'https://api.igdb.com/v4/platforms';

    public function __construct($clientId, $accessToken)
    {
        $this->clientId = $clientId;
        $this->accessToken = $accessToken;
    }

    public function searchJRPG($searchTerm)
    {
        $fields = 'fields name, summary, url, genres.name, first_release_date, involved_companies.company.name, platforms.name, cover.url;';
        $query = 'search "' . $searchTerm . '";';

        return $this->sendRequest($this->url, $fields, $query);
    }

    public function getInvolvedCompanyName($id)
    {
        $fields = 'fields name;';
        $query = 'where id = ' . $id . ';';



        return $this->sendRequest($this->companies, $fields, $query);
    }

    public function getGenreName($id)
    {
        $fields = 'fields name;';
        $query = 'where id = ' . $id . ';';

        return $this->sendRequest($this->genres, $fields, $query);
    }

    public function getPlatformName($id)
    {
        $fields = 'fields name;';
        $query = 'where id = ' . $id . ';';

        return $this->sendRequest($this->platforms, $fields, $query);
    }

    public function getPlatforms($pids)
    {
        $fields = 'fields name;';
        $query = 'where id = (' . $pids . ');';

        return $this->sendRequest($this->platforms, $fields, $query);
    }

    private function sendRequest($url, $fields, $query)
    {

        $requestData = [
            'method' => 'POST',
            'headers' => [
                'Client-ID' => $this->clientId,
                'Authorization' => 'Bearer ' . $this->accessToken,
                'Accept' => 'application/json'
            ],
            'body' => $fields . $query
        ];

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
