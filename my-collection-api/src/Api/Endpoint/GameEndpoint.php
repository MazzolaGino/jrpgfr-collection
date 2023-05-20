<?php

namespace MyCollectionApi\Api\Endpoint;



class GameEndpoint extends BaseEndpoint{
    

    public function __construct(mixed $config, \PDO $db, string $token)
    {
        parent::__construct($config, $db, $token);
     
    }

    public function getList($search)
    {
        if($this->validateToken()) 
        {   
            return $this->gameApi->searchJRPG($search);
        }
    }
    
}