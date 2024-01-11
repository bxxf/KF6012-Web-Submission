<?php

/**
 * This class is used for accessing the affiliation table in the database.
 * Class AffiliationRepository
 * @package Assessment\Repositories
 * @author Filip Brebera w21020340
 */

namespace Assessment\Repositories;

class AffiliationRepository
{
    private $chiDatabase;

    /**
     * AffiliationRepository constructor.
     * Initializes the database manager for the CHI database.
     */
    public function __construct()
    {
        $dbName = __DIR__ . "/../../database/chi2023.sqlite";
        $this->chiDatabase = new \Assessment\Managers\DatabaseManager($dbName);
    }

    /**
     * This function returns the countries.
     * @return array - Array containing the countries
     */
    public function getCountries()
    {
        $countries = $this->chiDatabase->query("SELECT DISTINCT country FROM affiliation ORDER BY country ASC");
        /* Mapping the array to only contain the country names */
        $countries = array_map(function ($country) {
            return $country["country"];
        }, $countries);
        return $countries;
    }

    /**
     * This function returns the authors with their affiliations.
     * @param string|null $country - Country name
     * @param string|null $contentId - Content ID
     * @return array - Array containing the authors with their affiliations
     */
    public function getAuthorsWithAffiliations(string|null $country = null, int|null $contentId = null)
    {
        $condition = "1";

        if ($country) {
            $condition = "LOWER(aff.country) = ?";
            $params[] = strtolower($country);
        } elseif ($contentId) {
            $condition = "c.id = ?";
            $params[] = $contentId;
        }

        $query = <<<SQL
        SELECT 
            a.id AS author_id, 
            a.name AS author_name, 
            aff.country, 
            aff.city, 
            aff.institution, 
            c.id AS content_id, 
            c.title AS content_title,
            c.type AS content_type
        FROM 
            author a
        JOIN 
            content_has_author cha ON a.id = cha.author
        JOIN 
            content c ON cha.content = c.id
        JOIN 
            affiliation aff ON a.id = aff.author AND c.id = aff.content
        WHERE 
            $condition
        GROUP BY
            c.id
    SQL;

        $stmt = $this->chiDatabase->prepare($query);

        if (isset($country)) {
            $stmt->bindParam(1, $country);
        } elseif (isset($contentId)) {
            $stmt->bindParam(1, $contentId, \PDO::PARAM_INT);
        }
        // B
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * This function returns the content with author affiliations and parameters for frontend.
     * @param string|null $country - Country name
     * @param string|null $contentId - Content ID
     * @param bool|null $includeAwards - Include awards
     * @param int|null $limit - Limit
     * @param string|null $typeId - Type ID
     * @param int|null $page - Page
     * @return array - Array containing the authors with their affiliations
     */
    public function getContentWithAffiliations(int|null $limit = null, string|null $typeId = null, int|null $page = null, string|null $search = null)
    {
        $params = [];
        $condition = "1";

        if (isset($typeId)) {
            $condition = "LOWER(c.type) = ?";
            $params[] = $typeId;
        }
        if (isset($search)) {
            $condition = "LOWER(c.title) LIKE ?";
            $params[] = "%$search%";
        }

        $limitStr = isset($limit) ? " LIMIT :limit" : "";
        $offsetStr = isset($page) && isset($limit) ? " OFFSET :offset" : "";

        $query = <<<SQL
        SELECT 
            a.id AS author_id, 
            a.name AS author_name, 
            aff.country, 
            aff.city, 
            aff.institution, 
            c.id AS content_id, 
            c.title AS content_title,
            c.type AS content_type,
            c.abstract AS content_abstract
        FROM 
            author a
        JOIN 
            content_has_author cha ON a.id = cha.author
        JOIN 
            content c ON cha.content = c.id
        JOIN 
            affiliation aff ON a.id = aff.author AND c.id = aff.content
        WHERE 
            $condition
        GROUP BY
            c.id
        ORDER BY
           c.title
        $limitStr
        $offsetStr;
    SQL;

        $stmt = $this->chiDatabase->prepare($query);

        // Binding parameters
        foreach ($params as $key => $value) {
            $stmt->bindValue($key + 1, $value);
        }
        if (isset($limit)) {
            $stmt->bindParam(':limit', $limit, \PDO::PARAM_INT);
        }
        if (isset($page) && isset($limit)) {
            $offset = ($page - 1) * $limit;
            $stmt->bindParam(':offset', $offset, \PDO::PARAM_INT);
        }

        $stmt->execute();

        $authorsWithAffiliations = $stmt->fetchAll(\PDO::FETCH_ASSOC);


        // Query for all awards
        $awardsQuery = "SELECT content, GROUP_CONCAT(award.name) AS awards FROM content_has_award JOIN award ON content_has_award.award = award.id GROUP BY content_has_award.content";
        $awardsResult = $this->chiDatabase->query($awardsQuery);

        $awardsByContent = [];
        foreach ($awardsResult as $awardRow) {
            $awardsByContent[$awardRow['content']] = $awardRow['awards'];
        }

        // Merge awards into the array
        foreach ($authorsWithAffiliations as &$entry) {
            $contentId = $entry['content_id'];
            if (array_key_exists($contentId, $awardsByContent)) {
                $entry['awards'] = $awardsByContent[$contentId];
            } else {
                $entry['awards'] = null;
            }
        }
        return $authorsWithAffiliations;
    }
}
