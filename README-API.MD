# KF6012 Assessment API Documentation; Author: Filip Brebera (w21020340)

This document outlines the Assessment API's structure and functionality. The architecture of this API is heavily inspired by my personal preferences when coding in other programming languages such as Go. Root directories are pkg, utils and database. The pkg directory contains endpoints, managers, repositories and interfaces.

Repositories are used for data-related operations (working with the database), whereas managers are used to store logic for managing particular pieces of logic, such as the database management. The endpoints then invoke these repositories directly through creating new instances in constructor.

I am using PHP CodeSniffer composer dependency in a linting step to ensure that the code follows PSR-12 coding standarts (the dependency is not used in the code itself, only for linting in editor).

Postman collection and environment for testing are included in the `postman` directory.

## URL to the API

The API is hosted on the NUWebspace server at the following URL: 

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/)

## File Structure Overview

```
|  .gitignore - Excludes files from Git version control
|  composer.json - Defines dependencies and metadata for Composer
|  composer.lock - Locks dependencies to specific versions for Composer

|  .htaccess - Apache configuration file
|  index.php -  Primary entry point for the application
|  app.php - Bootstraps and autoloads dependencies

|  CodeSniffer.conf - CodeSniffer configuration file
|  phpcs.phar - CodeSniffer executable
|  phpcbf.phar - CodeSniffer fixer executable

|  vendor - Third-party Composer libraries
|  config - Configuration scripts and parameters directory

|  |  config.php - Global constants definitions
|  |  exception_handler.php - Global exception handling
|  |  routes.php - Definitions of API routes

|  pkg - Custom application code
|  |  handlers - Endpoint handlers
|  |  interfaces - Interfaces for dependency injection and safety for endpoints
|  |  managers - Managers for logic for higher level functionalities
|  |  repositories - Repositories for data-related actions

|  utils - Utility functions
|  database - Database files
|  |  chi2023.sqlite - SQLite database file
|  |  users.sqlite - SQLite database file

|  postman - Postman collection and environment for testing

```

## Routes prefix

The prefix for all routes is specified in `config/config.php`. By default, routes are accessible under the prefix `kf6012/coursework/api/`.

## Endpoints

### **GET /developer**

Returns Student ID and Name of the developer (me)

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/developer](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/developer)

**Response:**

```json
{
  "id": "w21020340",
  "name": "Filip Brebera"
}
```

### **GET /country**

Returns a list of countries represented in the content table

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/country](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/country)

```json
{
  "countries": [
    "Australia",
    "Austria",
    "Bangladesh",
    ...
}
```

### **GET /preview**

Returns list of videos and their preview videos

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/preview?limit=5](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/preview?limit=5)

**Output:**

```json
{
  "previews": [
    {
      "title": "Title of the video",
      "preview_video": "https://www.youtube.com/watch?v=xxxxxxx"
    },
    {
      "title": "Title of the video",
      "preview_video": "https://www.youtube.com/watch?v=xxxxxxx"
    }
  ]
}
```

**Parameters:**

- `limit` - Maximum number of previews to return (integer - default NULL)

### **GET /content**

Returns list of content within the database

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/content?limit=5&type=paper](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/content?limit=5&type=paper)

**Output:**

```json
{
  "content": [
    {
      "title": "Title of the paper"
      "abstract": "Abstract of the paper",
      "type": "Paper"
    },
    {
      "title": "Title of the Case Study",
      "abstract": "Abstract of the Case Study",
      "type": "Case Study"
    }
    ...
  ]
}
```

**Parameters:**

- `page` - Page number (integer)
- `limit` - Limit the amount of content to return per page (integer - default 20)
- `type` - Filters content by type (string - default ALL)

### **GET /author-and-affiliation**

Returns list of authors and their affiliations

https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/author-and-affiliation?country=czech+republic

**Output:**

```json
{
  "authors": [
    {
      "author_id": 1,
      "author_name": "Author Name",
      "country": "United Kingdom",
      "city": "London",
      "institution": "Northumbria University"
      "content_id": 0,
      "content_title": "Title of the paper"
    },
    {
      "author_id": 2,
      "author_name": "Author Name",
      "country": "United Kingdom",
      "city": "London",
      "institution": "Northumbria University"
      "content_id": 1,
      "content_title": "Title of the paper"
    }
    ...
  ]
}
```

**Parameters:**

- `content` - Filter based on ID of the content (integer)
- `country` - Filter based on country of the origin (string)

### **GET /content-types**

Returns list of content types

https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/content-types

**Output:**

```json
{
    "types": [
      {
          "id": 12713,
          "name": "AltCHI"
      },
    ...
    ]
}
```

### **GET /directory**

Returns list of content and author affiliations and other information based on input from frontend

https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/directory?search=explain&type=paper

**Parameters:**

- `limit` - Limit the amount of content to return per page (integer - default NULL)
- `page` - Page number (integer - default NULL)
- `type` - Filters content by type (string - default ALL)
- `search` - Search string (string - default NULL)

**Output:**

```json
 {
"content": [
  {
  "author_id":97549,
    "author_name":"Jonathan  Cooper",
    "country":"United Kingdom",
    "city":"Glasgow",
    "institution":"University of Glasgow",
    "content_id":99076,
    "content_title":"\"A Switch Went off in my Whole Body\": Lived Experiences of Fatigue and Post-Exertional Malaise in Long Covid",
    "content_type":12528,
    "content_abstract":"The growing HCI agenda on health has focused on different chronic conditions but less so on Long Covid, despite its severe impact on the quality of life. We report findings from 2 workshops with 13 people living with Long Covid, indicating the challenges of making sense of their physical, cognitive, and emotional symptoms, and of monitoring the triggers of post-exertional malaise. While most participants engage in pacing activities for the self-management of fatigue, only a few are aware of the importance of planning all their daily activities and routines in order to avoid post-exertional malaise. We conclude with design implications to support lightweight tracking and sensemaking of fatigue symptoms, novel data analytics for monitoring the triggers of post-exertional malaise and the worsening of symptoms, and support for self-management in order to  prevent post-exertional malaise.",
    "awards":null
    }
  ...
  ]
 }
```

### **POST /token**

Returns a JWT token for authentication

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/token](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/token)

**Input Headers:**

```
Authorization: Basic base64(username:password)
```

**Output:**

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3MjEwMjAzNDAiLCJpc3MiOiJodHRwczovL3cyMTAyMDM0MC5udXdlYnNwYWNlLmNvLnVrL2tmNjAxMi9jb3Vyc2V3b3JrL2FwaS9hdXRoL3Rva2VuIiwiaWF0IjoxNjE5NjY0NjY4LCJleHAiOjE2MTk2Njg1NjgsIm5iZiI6MTYxOTY2NDY2OCwianRpIjoiZjJiZjQ4ZjYtZjQ4ZS00ZjY4LWE5ZjUtZjY5Zj"
}
```

Response headers:

```
Set-Cookie: logintoken=TOKEN SameSite=Strict; Path=/; Max-Age=1800"
```

### **GET /user**

Returns information about the user

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/user](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/user)

**Input Headers:**

```
Authorization: Bearer TOKEN
```

**Output:**

```json
{
  "user": {
    "id": 1,
    "iat": 1704986906,
    "exp": 1704988706,
    "iss": "localhost:8080",
    "email": "john@example.com"
  }
}
```

### **GET /note**

Returns list of notes for the user

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note)

**Input Headers:**

```
Authorization: Bearer TOKEN
```

**Output:**

```json
{
  "notes": [
    {
      "id": 1,
      "account_id": 1,
      "content_id": 96031,
      "text": "some text"
    },
    ...
  ]
}
```

### **POST /note**

Creates a new note for the user

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note)

**Input Headers:**

```
Authorization: Bearer TOKEN
```

**Input:**

```json
{
  "content_id": 95695,
  "text": "some text"
}
```

**Output:**

```json
{
  "note": {
    "content_id": 95695,
    "text": "some text",
    "id": "4"
  }
}
```

### **PUT /note**

Updates a note for the user

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note)

**Input Headers:**

```
Authorization: Bearer TOKEN
```

**Input:**

```json
{
  "note_id": 1,
  "text": "new text"
}
```

**Output:**

```json
{
  "note": {
    "note_id": 1,
    "text": "new text"
  }
}
```

### **DELETE /note**

Deletes a note for the user

[https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note](https://w21020340.nuwebspace.co.uk/kf6012/coursework/api/note)

**Input Headers:**

```
Authorization: Bearer TOKEN
```

**Input:**

```json
{
  "note_id": 1
}
```

**Output:**

```json
{
  "note": 1
}
```
