<?php

/**
 * This interface is used for endpoints that only support POST requests.
 * Interface GetEndpointInterface
 * @package Assessment\Interfaces
 * @author Filip Brebera w21020340
 */

namespace Assessment\Interfaces;

interface PostEndpointInterface
{
    public function post(array $parameters = []);
}
