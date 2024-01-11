<?php

/**
 * This endpoint returns list of all content types.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\ResponseUtils;

class ContentTypesEndpoint implements GetEndpointInterface
{
    private $contentRepository;

    public function __construct()
    {
        $this->contentRepository = new \Assessment\Repositories\ContentRepository();
    }
    public function get(array $parameters = [])
    {
        $types = $this->contentRepository->getContentTypes();
        ResponseUtils::returnJson([
            "types" => $types
        ]);
    }
}
