<?php

/**
 * This endpoint returns list of videos with their titles.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\ResponseUtils;
use Assessment\Utils\RequestUtils;

class PreviewEndpoint implements GetEndpointInterface
{
    private $contentRepository;

    public function __construct()
    {
        $this->contentRepository = new \Assessment\Repositories\ContentRepository();
    }
    public function get(array $parameters = [])
    {
        // use limit only if its present in the array - preventing the warning
        $limit = RequestUtils::parameterOrNull("limit", $parameters);

        $previews = $this->contentRepository->getPreviews($limit);
        ResponseUtils::returnJson([
            "previews" => $previews
        ]);
    }
}
