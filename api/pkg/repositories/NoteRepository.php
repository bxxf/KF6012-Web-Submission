<?php

/**
 * This class is used for managing the notes in the database.
 * @package Assessment\Repositories
 * @author Filip Brebera w21020340
 */

namespace Assessment\Repositories;

use Assessment\Utils\RequestUtils;
use Assessment\Utils\JwtUtils;
use Assessment\Utils\ResponseUtils;

class NoteRepository
{
    private $userDatabase;
    private $contentRepository;

    private $jwtManager;

    /**
     * NoteRepository constructor.
     * Initializes the database manager for the notes table.
     */
    public function __construct()
    {
        $this->userDatabase = new \Assessment\Managers\DatabaseManager(__DIR__ . "/../../database/users.sqlite");
        $this->contentRepository = new \Assessment\Repositories\ContentRepository();
        $this->jwtManager = new \Assessment\Managers\JwtManager();
    }

    /**
     * Returns notes for the given user.
     * @param int $userId
     * @return array
     */
    public function getNotesByUser(int $userId)
    {
        $notes = $this->userDatabase->get("note", ["account_id" => $userId]);
        return $notes;
    }
    /**
     * Creates note for the logged user.
     * @param int $contentId
     * @param string $text
     * @return array
     */
    public function createNoteCurrentUser(int $contentId, string $text)
    {
        // Check the JWT token and get the user id
        $token = RequestUtils::bearerAuthorizationGuard();
        $user = $this->jwtManager->verifyToken($token);

        // Check if the content id exists
        $contentExists = $this->contentRepository->contentExists($contentId);

        if (!$contentExists) {
            ResponseUtils::badRequest("Content does not exist");
            die();
        }

        // Insert the note into the database
        $result = $this->userDatabase->insert("note", [
            "account_id" => $user["id"],
            "content_id" => $contentId,
            "text" => $text,
        ]);

        return $result;
    }

    /**
     * Updates note for the logged user.
     * @param int $noteId
     * @param string $text
     * @return array
     */
    public function updateNoteCurrentUser(int $noteId, string $text)
    {
        // Check the JWT token and get the user id
        $token = RequestUtils::bearerAuthorizationGuard();
        $user = $this->jwtManager->verifyToken($token);

        // Check if the note exists
        $noteExists = $this->userDatabase->get("note", ["id" => $noteId, "account_id" => $user["id"]]);

        if (count($noteExists) == 0) {
            ResponseUtils::badRequest("Note does not exist");
            die();
        }

        // Update the note in the database
        $this->userDatabase->update("note", [
            "text" => $text,
        ], [
            "id" => $noteId,
        ]);

        return [
            "id" => $noteId,
            "text" => $text,
        ];
    }

    /**
     * Deletes note for the logged user.
     * @param int $noteId
     * @return array
     */
    public function deleteNoteCurrentUser(int $noteId)
    {
        // Check the JWT token and get the user id
        $token = RequestUtils::bearerAuthorizationGuard();
        $user = $this->jwtManager->verifyToken($token);

        // Check if the note exists
        $noteExists = $this->userDatabase->get("note", ["id" => $noteId, "account_id" => $user["id"]]);

        if (count($noteExists) == 0) {
            ResponseUtils::badRequest("Note does not exist");
            die();
        }

        // Delete the note from the database
        $this->userDatabase->delete("note", [
            "id" => $noteExists[0]["id"],
        ]);

        return true;
    }
}
