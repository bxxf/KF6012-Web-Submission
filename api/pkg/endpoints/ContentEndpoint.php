<?php

/**
 * This endpoint returns content of the research.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\ResponseUtils;
use Assessment\Utils\RequestUtils;

class ContentEndpoint implements GetEndpointInterface
{
    private $contentRepository;

    public function __construct()
    {
        $this->contentRepository = new \Assessment\Repositories\ContentRepository();
    }
    public function get(array $parameters = [])
    {
        $page = RequestUtils::parameterOrNull("page", $parameters);
        // Additional parameter not in the specification: limit - can change the size of one page
        $limit = RequestUtils::parameterOrNull("limit", $parameters);
        $type = RequestUtils::parameterOrNull("type", $parameters);

        $content = $this->contentRepository->getContent($page, $limit, $type);

        ResponseUtils::returnJson([
            "content" => $content
        ]);
    }
}
