<?php

/**
 * This endpoint returns list of country names.
 * @package Assessment\Endpoints
 * @author Filip Brebera w21020340
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\GetEndpointInterface;
use Assessment\Utils\ResponseUtils;

class CountryEndpoint implements GetEndpointInterface
{
    private $affiliationRepository;

    public function __construct()
    {
        $this->affiliationRepository = new \Assessment\Repositories\AffiliationRepository();
    }
    public function get(array $parameters = [])
    {
        $countryNames = $this->affiliationRepository->getCountries();

        ResponseUtils::returnJson([
            "countries" => $countryNames
        ]);
    }
}
