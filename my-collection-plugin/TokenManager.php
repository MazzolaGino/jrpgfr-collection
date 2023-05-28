<?php 
class TokenManager {
    private $clientSecret;

    public function __construct() {

        $this->clientSecret = '8hNyj0XuKTRCkNLNfNfYsHZtjEKruxKTnEjSSP4oLcePVRMYNun8ohweWLAWH9T7e89J8K6UsngW0qUpqviLB5bRmVRNWhz3SXFAOrsVjIj4v1X4NnRCY1pQxuKswggYbThBLwzFwOeNjAJqbXgyJfCSTBoO46cMS7VXxWewGrG3Mkgr7g9GQJjGRwXkNL16pCv5ERq1PCmrd7wWln47fshhXHYElpvWp6eCf9vLKnlQWh3sSvAOTYVwNTrFqVcv1BQJHmO9CjqH1fA77IeBXI98IjGr5mUhK8J4aG7pDBZHYuWH1DRGpp6WVDIvCrGqfHwVRsOytB4YB2B8ceERW1exOS';
    
    }

    public function generateToken($username, $password) {
        // Vérification des informations d'identification de l'utilisateur WordPress
        $credentials = array(
            'user_login'    => $username,
            'user_password' => $password,
        );
		
        $user = wp_authenticate($credentials['user_login'], $credentials['user_password']);

        if (is_wp_error($user)) {
            return new WP_Error('invalid_credentials', 'Invalid username or password', array('status' => 401));
        }

        $user_id = $user->ID;

        // Calcul de la date d'expiration (30 jours)
        $expiration = strtotime('+30 days');

        // Génération du token JWT
        $token = $this->generateJWT($user_id, $expiration);

        return $token;
    }

    public function validateToken($token) {
  
        // Décodage du token JWT
        $decoded_token = $this->decodeJWT($token);

        if (!$decoded_token) {
            return false;
        }

        // Vérification de la signature
        $is_valid_signature = $this->verifySignature($decoded_token['payload'], $decoded_token['signature']);

        if (!$is_valid_signature) {
            return false;
        }

        // Vérification de l'expiration
        $current_time = time();
        $expiration_time = $decoded_token['payload']['exp'];

        if ($current_time > $expiration_time) {
            return false;
        }

        return true;
    }

    public function getUserFromToken($token) {
        // Décodage du token JWT
        $decoded_token = $this->decodeJWT($token);

        if (!$decoded_token) {
            return null;
        }

        // Récupération de l'ID de l'utilisateur
        $user_id = $decoded_token['payload']['user_id'];

        // Récupération des informations de l'utilisateur
        $user = get_user_by('ID', $user_id);

        return $user;
    }
    
    private function generateJWT($user_id, $expiration) {
        // Création du payload JWT
        $payload = array(
            'user_id' => $user_id,
            'exp' => $expiration,
        );

        // Encodage du payload en JSON et en base64
        $encoded_payload = base64_encode(wp_json_encode($payload));

        // Signature du token avec la clé secrète
        $signature = hash_hmac('sha256', $encoded_payload, $this->clientSecret);

        // Encodage du token JWT final
        $token = $encoded_payload . '.' . $signature;

        return $token;
    }

    private function decodeJWT($token) {

        // Séparation du token en payload et signature
        $parts = explode('.', $token);
        $encoded_payload = $parts[0];
        $signature = $parts[1];

        // Décodage du payload en base64 et en JSON
        $decoded_payload = json_decode(base64_decode($encoded_payload), true);

        return array(
            'payload' => $decoded_payload,
            'signature' => $signature
        );
    }

    private function verifySignature($payload, $signature) {
        // Encodage du payload en JSON et en base64
        $encoded_payload = base64_encode(wp_json_encode($payload));

        // Génération de la signature attendue
        $expected_signature = hash_hmac('sha256', $encoded_payload, $this->clientSecret);

        // Comparaison de la signature attendue avec la signature fournie
        return hash_equals($expected_signature, $signature);
    }
}
