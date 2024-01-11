<?php

/**
 * This is the main entry point of the API.
 * @package Assessment
 * @author Filip Brebera w21020340
 */

namespace Assessment;

// Error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Autoload composer dependencies
require __DIR__ . '/vendor/autoload.php';

// Some mandatory imports that needs to be used before autoload
require_once("./utils/ResponseUtils.php");
require_once("./utils/RequestUtils.php");

require_once("./config/config.php");
require_once("./config/routes.php");
require_once("./config/exception_handler.php");

require_once("./pkg/handlers/EndpointHandler.php");

require_once("./app.php");


// Define global exception handler
set_exception_handler('exceptionHandler');

// Routing and handling the request
$endpointHandler = new Handlers\EndpointHandler($routes);
$app = new App($endpointHandler);

$app->autoLoadFiles();
$app->initRouter();
