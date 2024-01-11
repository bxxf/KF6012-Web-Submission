<?php

/**
 * This class contains utility methods for returning responses from endpoints
 * @package Assessment\Utils
 * @author Filip Brebera w21020340
 */

namespace Assessment\Utils;

abstract class ResponseUtils
{
    /**
     * This method returns a JSON response with the given data, status and headers.
     * @param $data - data to be returned
     * @param int|null $status - status code to be returned
     * @param array|null $headers - headers to be returned
     */
    public static function returnJson($data, $status = 200, $headers = array())
    {
        $data = json_encode($data, JSON_UNESCAPED_UNICODE, $status);
        header("Content-Type: application/json; charset=utf-8");

        foreach ($headers as $key => $value) {
            header($key . ": " . $value);
        }

        $http_origin = ORIGIN;

        // avoid cors
        header("Access-Control-Allow-Origin: $http_origin");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, U-LOG");

        http_response_code($status);
        echo $data;
        die();
    }

    public static function badRequest($message)
    {
        self::returnJson([
            "error" => $message
        ], 400);
        exit();
    }

    public static function unauthorized($message)
    {
        self::returnJson([
            "error" => $message
        ], 401);
        exit();
    }
}
