<?php

/**
 * This class is used for managing the database and executing queries.
 * @package Assessment\Managers
 * @author Filip Brebera w21020340
 */

namespace Assessment\Managers;

class DatabaseManager
{
    private $pdo;

    public function __construct($dbName)
    {
        // Create (connect to) SQLite database in file
        $this->pdo = new \PDO('sqlite:' . $dbName);
        // Set errormode to exceptions
        $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }

    /**
     * This function is used for getting data from the database.
     * @param $table
     * @param array $conditions
     * @param string $columns
     * @return array
     */
    public function get($table, $conditions = [], $columns = "*")
    {
        // if columns are array then implode them
        if (is_array($columns)) {
            $columns = implode(", ", $columns);
        }

        $query = "SELECT $columns FROM $table";

        if (count($conditions) > 0) {
            $query .= " WHERE ";
            $query .= implode(" AND ", array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($conditions)));
        }

        $stmt = $this->pdo->query($query);
        // Bind values
        foreach ($conditions as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }
        // Execute query
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * This function is used for inserting data into the database.
     * @param $table
     * @param $data
     */
    public function insert($table, $data)
    {
        // Provisional implementation of insert function
        $columns = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));
        $query = "INSERT INTO $table ($columns) VALUES ($values)";

        $stmt = $this->pdo->prepare($query);
        // Bind values
        foreach ($data as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }
        // Execute query
        $stmt->execute();
        return $this->pdo->lastInsertId();
    }

    /**
     * This function is used for updating data in the database.
     * @generated - Github Copilot was used for generating this function
     * @param $table
     * @param $data
     * @param $conditions
     * @return array
     */
    public function update(string $table, array $data, array $conditions)
    {
        $query = "UPDATE $table SET ";
        $query .= implode(", ", array_map(function ($key) {
            return "$key = :$key";
        }, array_keys($data)));
        $query .= " WHERE ";
        $query .= implode(" AND ", array_map(function ($key) {
            return "$key = :$key";
        }, array_keys($conditions)));

        $stmt = $this->pdo->prepare($query);
        // Bind values
        foreach ($data as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }
        foreach ($conditions as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }
        // Execute query
        $stmt->execute();
        return $data;
    }

    /**
     * This function is used for deleting data from the database.
     * @generated - Github Copilot was used for generating query
     * @param string $table
     * @param array $conditions
     * @return int
     */
    public function delete(string $table, array $conditions)
    {
        $query = "DELETE FROM $table WHERE ";
        $query .= implode(" AND ", array_map(function ($key) {
            return "$key = :$key";
        }, array_keys($conditions)));

        $stmt = $this->pdo->prepare($query);
        // Bind values
        foreach ($conditions as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }
        // Execute query
        $stmt->execute();
        return $stmt->rowCount();
    }

    /**
     * This function is used for calling custom queries.
     * @param $query
     * @return array
     */
    public function query($query)
    {
        $stmt = $this->pdo->query($query);

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
