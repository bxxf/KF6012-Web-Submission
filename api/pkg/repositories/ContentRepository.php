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
        if ($limit) {
            $previews = $this->chiDatabase->query("SELECT title, preview_video FROM content WHERE preview_video IS NOT NULL LIMIT $limit");
            return $previews;
        }

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
        // Define the condition for the query based on the parameters
        if (isset($type)) {
            $type = strtolower($type);
            $condition = "LOWER(type.name) = '$type'";
        } else {
            $condition = "1";
        }

        // If page parameter is set then use offsetting and limit, otherwise return all content
        if (isset($page)) {
            if (!isset($limit)) {
                $limit = 20;
            }
            // If page is 1 then don't use offsetting
            if ($page == 1) {
                $query = "SELECT content.id, title, abstract, type.name AS type FROM content JOIN type ON content.type = type.id WHERE $condition LIMIT $limit";
            } else {
                $offset = $limit * ($page - 1);

                $query = "SELECT content.id, title, abstract, type.name AS type FROM content JOIN type ON content.type = type.id WHERE $condition LIMIT $limit OFFSET $offset";
            }
        } else {
            $query = "SELECT content.id, title, abstract, type.name AS type FROM content JOIN type ON content.type = type.id WHERE $condition";
        }
        $content = $this->chiDatabase->query($query);
        return $content;
    }

    public function getContentTypes()
    {
        $contentTypes = $this->chiDatabase->query("SELECT * FROM type ORDER BY name ASC");
        return $contentTypes;
    }
}
