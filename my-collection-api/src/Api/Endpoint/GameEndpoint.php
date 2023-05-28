<?php

namespace MyCollectionApi\Api\Endpoint;

use MyCollectionApi\Api\Repository\CollectionRepository;

class GameEndpoint extends BaseEndpoint
{
    private $collectionRepository;

    public function __construct(mixed $config, \PDO $db, string $token)
    {
        parent::__construct($config, $db, $token);
        $this->collectionRepository = new CollectionRepository($db);
    }

    public function getList($search)
    {
        if ($this->validateToken()) {
            
            return json_encode($this->gameApi->searchJRPG($search), JSON_PRETTY_PRINT);
        }

        $this->unauthorized();
    }

    public function addToCollection($object)
    {
        if ($this->validateToken()) {
            try {
                $this->db->beginTransaction();

                $gameExists = $this->collectionRepository->checkGameExists($object['id']);

                if (!$gameExists) {
                    
                    $this->collectionRepository->saveGamesFromJson($object);
                }

                $collectionExists = $this->collectionRepository->checkCollectionExists($object['id']);

                if (!$collectionExists) {
                    $userId = $this->getUserIdFromToken();
                    $this->collectionRepository->addToCollection($userId, $object['id']);
                } else {
                    http_response_code(403);
                    die();
                }

                $this->db->commit();

                return json_encode(['success' => true], \JSON_PRETTY_PRINT);
            } catch (\Exception $e) {
                $this->db->rollBack();
            }
        }

        $this->unauthorized();
    }

    public function getPlatforms()
    {
        if ($this->validateToken()) {
            $userId = $this->getUserIdFromToken();
            $pids = $this->collectionRepository->getUserSupports($userId);

            if ($pids && count($pids) > 0) {
                $platforms = $this->gameApi->getPlatforms(implode(', ', $pids));

                $platforms = json_decode($platforms);

                $plts = [];
                $plts[] = ['id' => -1, 'name' => 'Choisis une console...'];

                return json_encode(array_merge($plts, $platforms), JSON_PRETTY_PRINT);
            }
        }

        $this->unauthorized();
    }

    public function getCollection($search, $advance, $platform)
    {
        if ($this->validateToken()) {
            $userId = $this->getUserIdFromToken();
            $ids = $this->collectionRepository->getCollectionItems($userId, $search, $advance, $platform);

            $collectionItems = [];

            if (count($ids) > 0) {
               
                foreach ($ids as $id) {
                    $collectionItems[] = $this->collectionRepository->reconstructJsonById($userId, $id);
                }
            }

            return json_encode(['collection' => $collectionItems], JSON_PRETTY_PRINT);
        }

        $this->unauthorized();
    }

    public function updateCollectionItem($item)
    {
        if ($this->validateToken()) {
            $userId = $this->getUserIdFromToken();

            $success = $this->collectionRepository->updateCollectionItem(
                $userId,
                $item['game_id'],
                $item['rating'],
                $item['hours_number'],
                $item['status'],
                $item['review']
            );

            if ($success) {
                return json_encode(['success' => true]);
            }
        }

        $this->unauthorized();
    }
}
