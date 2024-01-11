<?php

/**
 * This function is responsible for returning exception details in the response - obtained from week 4 workshop
 * @author Filip Brebera w21020340
 * @return array
 */

use Assessment\Utils\ResponseUtils;

function exceptionHandler($e)
{
    $output['message'] = "Internal Server Error";
    $output['details']['exception'] = $e->getMessage();
    $output['details']['file'] = $e->getFile();
    $output['details']['line'] = $e->getLine();
    ResponseUtils::returnJson($output, 500);
    exit();
}
