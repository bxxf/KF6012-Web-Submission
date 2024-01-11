<?php

/**
 * This file is used for defining constants and autoloading directories.
 * @author Filip Brebera w21020340
 */

namespace Assessment\Config;

// Defining the default prefix for the API
define('DEFAULT_PREFIX', "kf6012/coursework/api/");

define("ORIGIN", "https://w21020340.nuwebspace.co.uk");

define('AUTOLOAD_DIRECTORIES', [
    'Interfaces' => 'interfaces',
    'Handlers'   => 'handlers',
    'Endpoints'  => 'endpoints',
    'Repositories' => 'repositories',
    'Managers' => 'managers',
]);

// import private key for JWT
$jwtSecret = file_get_contents(__DIR__ . "/jwt_secret.pem");
$jwtSecret = openssl_pkey_get_private($jwtSecret);
define("JWT_SECRET", $jwtSecret);
