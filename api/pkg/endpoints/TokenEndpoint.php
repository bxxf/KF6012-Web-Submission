<?php

/**
 * This endpoint returns JWT token for the user.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\PostEndpointInterface;
use Assessment\Utils\RequestUtils;
use Assessment\Utils\ResponseUtils;

class TokenEndpoint implements PostEndpointInterface
{
    private $userRepository;
    private $jwtManager;

    public function __construct()
    {
        $this->userRepository = new \Assessment\Repositories\UserRepository();
        $this->jwtManager = new \Assessment\Managers\JwtManager();
    }

    /**
     * This function returns JWT token for the user - if the user is authenticated.
     * @param array $parameters
     */
    public function post(array $parameters = [])
    {
        $authorization = RequestUtils::basicAuthorizationGuard();

        // verify password - returns false if the password is invalid
        $user = $this->userRepository->verifyPassword($authorization["username"], $authorization["password"]);

        // if the user is not found, return unauthorized
        if (!$user) {
            ResponseUtils::unauthorized("Invalid username or password");
        }

        // generate token based on user id
        $token = $this->jwtManager->generateToken([
            "id" => $user["id"],
        ]);

        ResponseUtils::returnJson(
            [
                "token" => $token
            ],
            200,
            // set cookie with token and expire time of 2 days -  httponly and samesite=strict for security, secure cannot be set as it will be used on client side
            [
                "Set-Cookie" => "logintoken=$token; SameSite=Strict; Path=/; Max-Age=1800"
            ]
        );
    }
}
