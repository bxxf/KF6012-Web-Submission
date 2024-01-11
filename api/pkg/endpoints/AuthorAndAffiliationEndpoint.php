<?php

/**
 * This endpoint returns list of authors with their affiliations.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\RequestUtils;
use Assessment\Utils\ResponseUtils;

class AuthorAndAffiliationEndpoint implements GetEndpointInterface
{
    private $affiliationRepository;

    public function __construct()
    {
        // create new instance of the repository to manage database
        $this->affiliationRepository = new \Assessment\Repositories\AffiliationRepository();
    }
    public function get(array $parameters = [])
    {
        $country = RequestUtils::parameterOrNull("country", $parameters);
        $content = RequestUtils::parameterOrNull("content", $parameters);

        if (isset($country) && isset($content)) {
            ResponseUtils::badRequest("Only one of the parameters 'country' and 'content' can be used at the same time.");
        }
        $authors = $this->affiliationRepository->getAuthorsWithAffiliations($country, $content);

        ResponseUtils::returnJson([
            "authors" => $authors
        ]);
    }
}
