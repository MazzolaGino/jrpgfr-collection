<?php
/*
Plugin Name: My Collection Plugin
Description: Provides endpoints for token generation, validation, and user retrieval.
Version: 1.0
Author: Your Name
*/

// Include TokenManager class
require_once(plugin_dir_path(__FILE__) . 'TokenManager.php');

// Register endpoints
add_action('rest_api_init', function() {
    register_rest_route('wfactor/v1', '/token', array(
        'methods' => 'POST',
        'callback' => 'wfactor_generate_token',
    ));

    register_rest_route('wfactor/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'wfactor_validate_token',
    ));

    register_rest_route('wfactor/v1', '/user', array(
        'methods' => 'POST',
        'callback' => 'wfactor_get_user',
    ));
});

// Token generation endpoint callback
function wfactor_generate_token($request) {
    $params = json_decode($request->get_body(), true); // Retrieve and decode the body parameters

    $username = $params['username'];
    $password = $params['password'];

    $tokenManager = new TokenManager();
    $token = $tokenManager->generateToken($username, $password);

    return array(
        'token' => $token,
    );
}

// Token validation endpoint callback
function wfactor_validate_token($request) {
    $params = json_decode($request->get_body(), true); // Retrieve and decode the body parameters

    $token = $params['token'];

    $tokenManager = new TokenManager();
    $is_valid = $tokenManager->validateToken($token);

    return array(
        'valid' => $is_valid,
    );
}

// User retrieval endpoint callback
function wfactor_get_user($request) {
    $params = json_decode($request->get_body(), true); // Retrieve and decode the body parameters

    $token = $params['token'];

    $tokenManager = new TokenManager();
    $user = $tokenManager->getUserFromToken($token);

    if ($user) {
        $username = $user->user_login;
        $email = $user->user_email;
        $id = $user->ID;

        return array(
            'id' => $id,
            'username' => $username,
            'email' => $email,
        );
    }

    return null;
}
