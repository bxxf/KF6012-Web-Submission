<?php

/**
 * This class is used for managing the users database.
 * Class UserRepository
 * @package Assessment\Repositories
 * @author Filip Brebera w21020340
 */

namespace Assessment\Repositories;

class UserRepository
{
    private $userDatabase;

    /**
     * UserRepository constructor.
     * Initializes the user database manager.
     */
    public function __construct()
    {
        $dbName = __DIR__ . "/../../database/users.sqlite";
        $this->userDatabase = new \Assessment\Managers\DatabaseManager($dbName);
    }

    /**
     * Verify password for the given user and return the user if the password is correct.
     * @param string $username
     * @param string $password
     * @return array|null
     */
    public function verifyPassword(string $username, string $password)
    {
        // Get the user from the database based on username
        $user = $this->userDatabase->get("account", ["email" => $username], ["id", "password"]);
        if (count($user) == 0) {
            return null;
        }
        $user = $user[0];

        $hashedPassword = $user["password"];

        // This is important - we need to use password_verify to compare the password with the hash and return null if the password is not correct
        if (!password_verify($password, $hashedPassword)) {
            return null;
        }

        return $user;
    }

    /**
     * Returns the user by the given id.
     * @param string $id
     * @return array
     */
    public function getUserById(string $id)
    {
        $user = $this->userDatabase->get("account", ["id" => $id])[0];
        return $user;
    }
}
