<?php

/**
 * This interface is used for endpoints that only support GET requests.
 * Interface GetEndpointInterface
 * @package Assessment\Interfaces
 * @author Filip Brebera w21020340
 */

namespace Assessment\Interfaces;

interface AllEndpointInterface
{
    public function get(array $parameters = []);
    public function post(array $parameters = []);
    public function put(array $parameters = []);
    public function delete(array $parameters = []);
}
