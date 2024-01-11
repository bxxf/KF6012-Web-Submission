<?php

/**
 * This class contains utility methods for generating JWT tokens.
 * @package Assessment\Managers
 * @author Filip Brebera w21020340
 */

namespace Assessment\Managers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Assessment\Utils\ResponseUtils;

class JwtManager
{
    /**
     * This method generates a JWT token with the given payload.
     * @param array $payload - payload to be encoded
     * @return string - generated JWT token
     */
    public function generateToken($payload)
    {
        $iat = time();
        // expiration in 30 minutes
        $exp = strtotime('+30 minutes', $iat);
        $iss = $_SERVER['HTTP_HOST'];

        $payload = array_merge($payload, [
            "iat" => $iat,
            "exp" => $exp,
            "iss" => $iss
        ]);

        $jwt = JWT::encode($payload, JWT_SECRET, 'RS256');
        return $jwt;
    }

    /**
     * This method verifies the given JWT token and returns the decoded payload.
     * @param string $token - JWT token to be verified
     * @return array|bool - decoded payload or false if the token is invalid
     */
    public function verifyToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key(openssl_pkey_get_details(JWT_SECRET)["key"], ('RS256')));
            return (array) $decoded;
        } catch (\Exception $e) {
            ResponseUtils::unauthorized("Invalid token");
            return false;
        }
    }
}
