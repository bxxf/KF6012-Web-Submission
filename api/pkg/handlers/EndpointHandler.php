<?php

/**
 * This class is responsible for handling the request and calling the appropriate endpoint logic
 * @package Assessment\Handlers
 * @author Filip Brebera w21020340
 */

namespace Assessment\Handlers;

use Assessment\Utils\ResponseUtils;

class EndpointHandler
{
    private $endpoints = [];
    private $prefix = null;

    public function __construct($endpoints, $prefix = DEFAULT_PREFIX)
    {
        $this->endpoints = $endpoints;
        $this->prefix = $prefix;
    }

    /**
     * This function is responsible for handling the request and calling the appropriate endpoint logic
     * @generated - GitHub CoPilot was used for generating part of this function - correct trimming of the request url and correct functions for handling the request method
     */
    public function handle()
    {
        $requestUrl = $_SERVER["REQUEST_URI"];
        // Remove the prefix from the request url
        $requestUrl = str_replace($this->prefix, '', $requestUrl);
        // Remove the trailing slash
        $requestUrl = trim($requestUrl, '/');
        // Remove the query string
        $requestUrl = explode('?', $requestUrl)[0];
        // Based on the request method, get the request body or the query parameters
        $requestBody = $_SERVER['REQUEST_METHOD'] === 'GET' ? $_GET : $this->decodeJsonData();

        // Find the class in the endpoints array based on routes.php file
        if (isset($this->endpoints[$requestUrl])) {
            $endpointClassName = $this->endpoints[$requestUrl];

            if (class_exists($endpointClassName)) {
                $endpointInstance = new $endpointClassName();

                $method = strtolower($_SERVER['REQUEST_METHOD']);

                // handle cors
                if ($method == "options") {
                    ResponseUtils::returnJson(
                        [],
                        200,
                        [
                            "U-LOG" =>  "This is a CORS preflight request for $endpointClassName endpoint.",

                        ]
                    );
                }

                if (method_exists($endpointInstance, $method)) {
                    // Call the appropriate method on the endpoint instance
                    $endpointInstance->$method($requestBody);
                } else {
                    $this->respondMethodNotAllowed();
                }
            } else {
                $this->respondNotFound();
            }
        } else {
            $this->respondNotFound();
        }
    }

    /**
     * This function is used for decoding the request body
     * @return array
     */
    private function decodeJsonData(): array
    {
        $data = file_get_contents('php://input');
        return json_decode($data, true) ?? [];
    }

    /**
     * This function is used for responding with a 404 status code
     */
    private function respondNotFound()
    {
        \Assessment\Utils\ResponseUtils::returnJson([
            "message" => "Endpoint Not Found"
        ], 404);
    }

    /**
     * This function is used for responding with a 405 status code
     */
    private function respondMethodNotAllowed()
    {
        \Assessment\Utils\ResponseUtils::returnJson([
            "message" => "Method Not Allowed"
        ], 405);
    }
}
