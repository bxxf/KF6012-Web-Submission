<?php

/**
 * This endpoint returns list of content with their authors and other information.
 * This endpoint is important as it is used for displaying content on the front-end.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\RequestUtils;
use Assessment\Utils\ResponseUtils;

class DirectoryEndpoint implements GetEndpointInterface
{
    private $affiliationRepository;

    public function __construct()
    {
        // create new instance of the repository to manage database
        $this->affiliationRepository = new \Assessment\Repositories\AffiliationRepository();
    }

    public function get(array $parameters = [])
    {
        $limit = RequestUtils::parameterOrNull("limit", $parameters);
        $page = RequestUtils::parameterOrNull("page", $parameters);
        $typeId = RequestUtils::parameterOrNull("type", $parameters);
        $search = RequestUtils::parameterOrNull("search", $parameters);

        $content = $this->affiliationRepository->getContentWithAffiliations($limit, $typeId, $page, $search);

        ResponseUtils::returnJson([
            "content" => $content
        ]);
    }
}
