<?php

/**
 * This file is used for defining routes for the API.
 * @author Filip Brebera w21020340
 */

$routes = [
    "developer" => "Assessment\Endpoints\DeveloperEndpoint",
    "country" => "Assessment\Endpoints\CountryEndpoint",
    "preview" => "Assessment\Endpoints\PreviewEndpoint",
    "author-and-affiliation" => "Assessment\Endpoints\AuthorAndAffiliationEndpoint",
    "content" => "Assessment\Endpoints\ContentEndpoint",
    "token" => "Assessment\Endpoints\TokenEndpoint",
    "note" => "Assessment\Endpoints\NoteEndpoint",
    "directory" => "Assessment\Endpoints\DirectoryEndpoint",
    "content-types" => "Assessment\Endpoints\ContentTypesEndpoint",
    "user" => "Assessment\Endpoints\UserEndpoint",
];
