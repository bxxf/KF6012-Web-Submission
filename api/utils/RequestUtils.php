<?php

/**
 * This class contains utility methods for managing requests.
 * @package Assessment\Utils
 * @author Filip Brebera w21020340
 */

namespace Assessment\Utils;

abstract class RequestUtils
{
    /**
     * This method is used to check if all required fields are present in the request.
     * @param array $fields
     * @param array $params
     * @return array|null
     */
    public static function requiredFieldsGuard(array $fields, array $params)
    {
        $requiredFields = [];
        $missing = [];
        foreach ($fields as $field) {
            if (!isset($params[$field])) {
                array_push($missing, $field);
            } else {
                $requiredFields[$field] = $params[$field];
            }
        }

        if (count($missing) > 0) {
            ResponseUtils::badRequest("Missing required fields: " . implode(", ", $missing));
        }

        return $requiredFields;
    }

    /**
     * This method is used to check if all required headers are present in the request.
     * @param array $headers
     * @return array|null
     */
    public static function requireHeadersGuard(array $headers)
    {
        $requiredHeaders = [];
        foreach ($headers as $header) {
            if (!isset($_SERVER[$header])) {
                ResponseUtils::badRequest("Header $header is required");
            } else {
                $requiredHeaders[$header] = $_SERVER[$header];
            }
        }
        return $requiredHeaders;
    }

    /**
     * This method is used to check if Basic authorization is present in the request.
     * @return array|null
     */
    public static function basicAuthorizationGuard()
    {
        $headers = getallheaders();
        $authorizationHeader = self::parameterOrNull("Authorization", $headers);

        if (!isset($authorizationHeader)) {
            ResponseUtils::returnJson([
                "error" => "Authorization is required"
            ], 401);
        }

        // regex for checking if auth header is basic
        if (!preg_match("/^Basic [a-zA-Z0-9=]+$/", $authorizationHeader)) {
            ResponseUtils::returnJson([
                "error" => "Invalid authorization header"
            ], 401);
        }
        // decoding the base64 basic auth header and removing the "Basic" prefix
        $decoded = base64_decode(explode(" ", $authorizationHeader)[1]);

        // splitting the decoded string into username and password
        $username = explode(":", $decoded)[0];
        $password = explode(":", $decoded)[1];

        return [
            "username" => $username,
            "password" => $password
        ];
    }

    /**
     * This method is used to check if Bearer authorization is present in the request.
     * @return string|null
     */
    public static function bearerAuthorizationGuard()
    {
        $headers = getallheaders();
        $authorizationHeader = self::parameterOrNull("Authorization", $headers);

        if (!isset($authorizationHeader)) {
            ResponseUtils::returnJson([
                "error" => "Authorization is required"
            ], 401);
            die();
        }

        // regex for checking if auth header is bearer
        if (!preg_match("/^Bearer .+$/", $authorizationHeader)) {
            ResponseUtils::returnJson([
                "error" => "Invalid authorization header"
            ], 401);
            die();
        }
        // removing the "Bearer" prefix
        $token = explode(" ", $authorizationHeader)[1];

        return $token;
    }

    /**
     * This method is used to check if the parameter is present in the request. If it is not present, null is returned.
     * @param string $key
     * @param array $parameters
     * @return mixed|null
     */
    public static function parameterOrNull(string $key, array $parameters)
    {
        return array_key_exists($key, $parameters) ? $parameters[$key] : null;
    }
}
