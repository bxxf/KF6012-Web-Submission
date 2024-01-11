<?php

/**
 * This endpoint returns student's name and ID.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\ResponseUtils;

class DeveloperEndpoint implements GetEndpointInterface
{
    public function get(array $parameters = [])
    {
        ResponseUtils::returnJson([
            "id" => "w21020340",
            "name" => "Filip Brebera"
        ]);
    }
}
