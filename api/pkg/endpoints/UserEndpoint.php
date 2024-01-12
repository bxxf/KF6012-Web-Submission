<?php

/**
 * This endpoint returns user's information.
 * @author Filip Brebera w21020340
 * @package Assessment\Endpoints
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\RequestUtils;
use Assessment\Utils\ResponseUtils;

class UserEndpoint implements GetEndpointInterface
{
    private $jwtManager;
    private $userRepository;

    public function __construct()
    {
        $this->jwtManager = new \Assessment\Managers\JwtManager();
        $this->userRepository = new \Assessment\Repositories\UserRepository();
    }

    public function get(array $parameters = [])
    {
        $token = RequestUtils::bearerAuthorizationGuard();
        $verify = $this->jwtManager->verifyToken($token);
        $user = $this->userRepository->getUserById($verify["id"]);

        ResponseUtils::returnJson([
            "user" => array_merge($verify, $user)
        ]);
    }
}
