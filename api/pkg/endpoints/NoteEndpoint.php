<?php

/**
 * This endpoint act as a CRUD for notes.
 * @author Filip Brebera w21020340
 * @package Assessment\Endpoints
 */

namespace Assessment\Endpoints;

use Assessment\Interfaces\AllEndpointInterface;
use Assessment\Utils\RequestUtils;
use Assessment\Utils\ResponseUtils;

class NoteEndpoint implements AllEndpointInterface
{
    private $noteRepository;
    private $jwtManager;


    public function __construct()
    {
        $this->noteRepository = new \Assessment\Repositories\NoteRepository();
        $this->jwtManager = new \Assessment\Managers\JwtManager();
    }

    public function get(array $parameters = [])
    {
        $token = RequestUtils::bearerAuthorizationGuard();
        $verify = $this->jwtManager->verifyToken($token);
        $note = $this->noteRepository->getNotesByUser($verify["id"]);

        ResponseUtils::returnJson([
            "notes" => $note
        ]);
    }

    public function post(array $parameters = [])
    {
        $fields = RequestUtils::requiredFieldsGuard(["content_id", "text"], $parameters);

        $noteId = $this->noteRepository->createNoteCurrentUser(
            $parameters["content_id"],
            $parameters["text"],
        );

        if (!$noteId) {
            ResponseUtils::badRequest("Note could not be created");
        }

        ResponseUtils::returnJson([
            "note" => array_merge($fields, ["id" => $noteId])
        ]);
    }

    public function put(array $parameters = [])
    {
        $fields = RequestUtils::requiredFieldsGuard(["note_id", "text"], $parameters);

        $success = $this->noteRepository->updateNoteCurrentUser(
            $parameters["note_id"],
            $parameters["text"],
        );

        if (!$success) {
            ResponseUtils::badRequest("Note could not be updated");
        }

        ResponseUtils::returnJson([
            "note" => $fields
        ]);
    }

    public function delete(array $parameters = [])
    {
        $fields = RequestUtils::requiredFieldsGuard(["note_id"], $parameters);

        $success = $this->noteRepository->deleteNoteCurrentUser(
            $parameters["note_id"],
        );

        if (!$success) {
            ResponseUtils::badRequest("Note could not be deleted");
        }

        ResponseUtils::returnJson([
            "note" => $fields["note_id"]
        ]);
    }
}
