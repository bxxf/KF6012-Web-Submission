<?php

/**
 * This interface is used for endpoints that only support GET requests.
 * Interface GetEndpointInterface
 * @package Assessment\Interfaces
 * @author Filip Brebera w21020340
 */

namespace Assessment\Interfaces;

interface GetEndpointInterface
{
    public function get(array $parameters = []);
}
