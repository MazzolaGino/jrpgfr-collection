<?php 

namespace MyCollectionApi\Api\Repository;

class CollectionRepository
{
    private $db;

    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    public function checkGameExists($gameId)
    {
        $query = "SELECT COUNT(*) FROM collection_item WHERE id = :id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $gameId);
        $statement->execute();

        return $statement->fetchColumn() > 0;
    }

    public function checkCollectionExists($gameId)
    {
        $query = "SELECT COUNT(*) FROM collection WHERE game_id = :id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $gameId);
        $statement->execute();

        return $statement->fetchColumn() > 0;
    }

    public function addToCollection($userId, $gameId)
    {
        $insertQuery = "INSERT INTO collection SET user_id = :user_id, game_id = :game_id";

        $statement = $this->db->prepare($insertQuery);
        $statement->bindParam(':user_id', $userId);
        $statement->bindParam(':game_id', $gameId);
        $statement->execute();
    }

    public function getCollectionItems($userId, $search, $advance, $platform)
    {

        $pJoin = '';
        $pWhere  = '';
        
        if($platform !== -1) {
            $pJoin = 'LEFT JOIN platforms pl ON pl.game_id = collection.game_id';
            $pWhere =  'pl.platform_id = :pl_id';
        }

        if($advance !== -1) {

        }

        $query = "
            SELECT game_id FROM collection 
            LEFT JOIN collection_item ci ON ci.id = collection.game_id
            $pJoin
            WHERE collection.user_id = :user_id
            AND LOWER(ci.name) LIKE :search 
            $pWhere
        ";

        $statement = $this->db->prepare($query);

        if($platform !== -1) {
            $statement->bindValue(':pl_id', $platform);
        }

        $statement->bindValue(':user_id', $userId);
        $statement->bindValue(':search', strtolower("%$search%"));
        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_COLUMN);
    }

    public function updateCollectionItem($userId, $gameId, $rating, $hoursNumber, $status, $review)
    {
        $query = "UPDATE collection 
            SET `rating` = :rating, 
                `hours_number` = :hours_number, 
                `status` = :status, 
                `review` = :review 
            WHERE user_id = :user_id AND game_id = :game_id";

        $statement = $this->db->prepare($query);

        $statement->bindParam(':rating', $rating);
        $statement->bindParam(':hours_number', $hoursNumber);
        $statement->bindParam(':status', $status);
        $statement->bindParam(':review', $review);
        $statement->bindParam(':user_id', $userId);
        $statement->bindParam(':game_id', $gameId);

        return $statement->execute();
    }

    public function saveGamesFromJson($game)
    {

        $this->saveGame($game);
        $this->saveGenres($game['id'], $game['genres']);
        $this->savePlatforms($game['id'], $game['platforms']);
        $this->saveInvolvedCompanies($game['id'], $game['involved_companies']);
    }

    private function saveGame($game)
    {
        $id = $game['id'];
        $coverId = isset($game['cover']['id']) ? $game['cover']['id'] : null;
        $coverUrl = isset($game['cover']['url']) ? $game['cover']['url'] : null;
        $releaseDate = isset($game['first_release_date']) ? $game['first_release_date'] : null;
        $name = isset($game['name']) ? $game['name'] : null;
        $summary = isset($game['summary']) ? $game['summary'] : null;
        $url = isset($game['url']) ? $game['url'] : null;

        $query = "INSERT INTO collection_item (id, cover_id, cover_url, first_release_date, name, summary, url)
                  VALUES (:id, :cover_id, :cover_url, :release_date, :name, :summary, :url)";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':cover_id', $coverId);
        $statement->bindParam(':cover_url', $coverUrl);
        $statement->bindParam(':release_date', $releaseDate);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':summary', $summary);
        $statement->bindParam(':url', $url);

        $statement->execute();
    }

    private function saveGenres($gameId, $genres)
    {
        $query = "INSERT INTO genres (game_id, genre_id)
                  VALUES (:game_id, :genre_id)";

        $statement = $this->db->prepare($query);

        foreach ($genres as $genre) {
            $genreId = $genre['id'];
            $genreName = $genre['name'];

            $statement->bindParam(':game_id', $gameId);
            $statement->bindParam(':genre_id', $genreId);

            $statement->execute();
        }
    }

    private function savePlatforms($gameId, $platforms)
    {
        $query = "INSERT INTO platforms (game_id, platform_id)
                  VALUES (:game_id, :platform_id)";

        $statement = $this->db->prepare($query);

        foreach ($platforms as $platform) {
            $platformId = $platform['id'];

            $statement->bindParam(':game_id', $gameId);
            $statement->bindParam(':platform_id', $platformId);

            $statement->execute();
        }
    }

    private function saveInvolvedCompanies($gameId, $involvedCompanies)
    {
        $query = "INSERT INTO involved_companies (game_id, company_id)
                  VALUES (:game_id, :company_id)";

        $statement = $this->db->prepare($query);

        foreach ($involvedCompanies as $company) {

            $companyId = $company['id'];

            $statement->bindParam(':game_id', $gameId);
            $statement->bindParam(':company_id', $companyId);

            $statement->execute();
        }
    }

    public function reconstructJsonById($userId, $gameId)
    {

        $gameData = $this->fetchGameData($gameId);

        if ($gameData === null) {
            // Le jeu n'a pas été trouvé dans la base de données
            return null;
        }

        $gameData['genres'] = $this->fetchGenres($gameId);
        $gameData['platforms'] = $this->fetchPlatforms($gameId);
        $gameData['involved_companies'] = $this->fetchInvolvedCompanies($gameId);
        $gameData['form'] = $this->getCollectionFormValues($userId, $gameId);

        return $gameData;
    }

    public function fetchGameData($gameId)
    {
        $query = "SELECT * FROM collection_item WHERE id = :game_id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':game_id', $gameId);
        $statement->execute();

        return $statement->fetch(\PDO::FETCH_ASSOC);
    }

    public function fetchGenres($gameId)
    {
        $query = "SELECT genre_id FROM genres WHERE game_id = :game_id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':game_id', $gameId);
        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function fetchPlatforms($gameId)
    {
        $query = "SELECT platform_id FROM platforms WHERE game_id = :game_id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':game_id', $gameId);
        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function fetchInvolvedCompanies($gameId)
    {
        $query = "SELECT company_id FROM involved_companies WHERE game_id = :game_id";

        $statement = $this->db->prepare($query);
        $statement->bindParam(':game_id', $gameId);
        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getCollectionFormValues($userId, $id)
    {
        $query =  "SELECT * FROM collection WHERE user_id = :user_id and game_id = :game_id";

        $q = $this->db->prepare($query);
        $q->bindParam(':user_id', $userId);
        $q->bindParam(':game_id', $id);

        $q->execute();

        return $q->fetch(\PDO::FETCH_ASSOC);
    }

    public function getUserSupports($userId)
    {
        $query = "
            SELECT DISTINCT(platform_id) pid FROM platforms
            LEFT JOIN collection_item on platforms.game_id = collection_item.id
            LEFT JOIN collection on collection_item.id = collection.game_id
            WHERE collection.user_id = :user_id
        ";

        $s = $this->db->prepare($query);

        $s->bindParam(':user_id', $userId);
        $s->execute();

        return $s->fetchAll(\PDO::FETCH_COLUMN, 0);
        
    }
}