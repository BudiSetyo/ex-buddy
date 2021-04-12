<h1 align="center"> Ex-Buddy Backend </h1>

This is a simple backend that I created using node js and the express js framework. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Clone the app type in terminal git clone https://github.com/BudiSetyo/ex-buddy.git
2. Open app's directory in CMD or Terminal
3. Type `npm install` or `yarn install`
4. Make new file a called **.env**, set up first [here](#set-up-env-file)
5. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/)
8. You can see all the end point [here](#end-point)

## End Point

**1. POST**

- `/items` (Add data to table items)

**2. GET**

- `/items`(Get All items)

- (Get All Items with fitur Search , Sort and Limit Pagination)

**3. GET BY ID**

- `/items/:id` (Get all detail on related id number)

**5. PUT BY ID**

- `/items/:id` (Update all column in items by id)

**4. PATCH BY ID**

- `/items/:id` (Update specific column in items by id)

**5. DELETE BY ID**

- `/items/:id` (Delete items by id)
