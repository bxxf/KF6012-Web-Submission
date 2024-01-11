<?php

/**
 * This class is used for accessing the content table in the database.
 * @package Assessment\Repositories
 * @author Filip Brebera w21020340
 */

namespace Assessment\Repositories;

class ContentRepository
{
    private $chiDatabase;

    /**
     * ContentRepository constructor.
     * Initializes the database manager for the CHI database.
     */
    public function __construct()
    {
        $dbName = __DIR__ . "/../../database/chi2023.sqlite";
        $this->chiDatabase = new \Assessment\Managers\DatabaseManager($dbName);
    }

    /**
     * Returns videos with their titles and previews, only if the preview is present.
     * @param int|null $limit
     * @return array
     */
    public function getPreviews(int $limit = null)
    {
        if (isset($limit)) {
            // Use a prepared statement with a placeholder for the limit
            $stmt = $this->chiDatabase->prepare("SELECT title, preview_video FROM content WHERE preview_video IS NOT NULL LIMIT :limit");
            // Bind the $limit parameter as an integer
            $stmt->bindParam(':limit', $limit, \PDO::PARAM_INT);
            $stmt->execute();
            // Fetch and return the results
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        // If no limit is provided, execute a simple query
        $previews = $this->chiDatabase->query("SELECT title, preview_video FROM content WHERE preview_video IS NOT NULL");
        return $previews;
    }


    /**
     * Returns if the content exists
     * @param int $contentId
     * @return bool
     */
    public function contentExists(int $contentId)
    {
        $content = $this->chiDatabase->get("content", ["id" => $contentId]);
        return count($content) > 0;
    }

    /**
     * This function returns the content with optional pagination.
     * @param int|null $page - Page number
     * @param int|null $limit - Number of items per page
     * @param string|null $type - Type of the content
     * @return array - Array containing the content
     */
    public function getContent(int $page = null, int $limit = null, string $type = null)
    {
        $params = [];
        // Fallback condition if no type is provided
        $condition = "1";

        if (isset($type)) {
            $condition = "LOWER(type.name) = ?";
            $params[] = strtolower($type);
        }

        if (isset($page)) {
            if (!isset($limit)) {
                $limit = 20;
            }

            // Calculate the offset based on the page number
            $offset = $limit * ($page - 1);

            // Create the query using placeholders for limit and offset
            $query = "SELECT content.id, title, abstract, type.name AS type FROM content JOIN type ON content.type = type.id WHERE $condition LIMIT :limit OFFSET :offset";
            $stmt = $this->chiDatabase->prepare($query);

            // Bind the parameters for limit and offset
            $stmt->bindParam(':limit', $limit, \PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, \PDO::PARAM_INT);
        } else {
            // Prepare the query without limit and offset
            $query = "SELECT content.id, title, abstract, type.name AS type FROM content JOIN type ON content.type = type.id WHERE $condition";
            $stmt = $this->chiDatabase->prepare($query);
        }

        // Bind the type parameter if set
        foreach ($params as $key => $value) {
            $stmt->bindValue($key + 1, $value);
        }

        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }


    public function getContentTypes()
    {
        $contentTypes = $this->chiDatabase->query("SELECT * FROM type ORDER BY name ASC");
        return $contentTypes;
    }
}
