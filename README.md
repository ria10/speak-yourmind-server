# Speak Your Mind - the server side!

## Description

Server for the website that allows you to anonymously post journal entries.
## Installation & Usage

### Installation

- Clone or download the repo.
### Usage 

- Run `npm install` to install node modules.
- Run `npm start` to start the server.
## Technologies
- JavaScript
- Express
- Cors
- Joi
- day.js
- uuid
- Jest
- Supertest
## Process

- Started by coding the basic structure of the server using `express`.
- Added `.json` file for storage of posts that are inputted into the front end.
- Coded the GET and POST endpoints.
- Added tests for all the endpoints.
<!-- <placeholder for screenshots> -->
## Wins & Challenges

### Wins

- The structure of the posts that are sending to `posts.json` so that we have a key-value pair for text, comments and all the reactions as well as the generated id's with `uuid`.
- Understanding properly how testing APIs work with the fetch method.
- Achieving data validation using `Joi` for the first time.

### Challenges

- Understanding the fetch requests for the tests to work.
