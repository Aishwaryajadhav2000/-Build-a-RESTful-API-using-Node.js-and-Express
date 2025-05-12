
1. Installs all project dependencies =>  npm i 
2. Starts the app using the command  =>   npm start server.js
3. code file => server.js 

-----------------------------All API's =>
1. GET /users => Fetch the list of all users.
2. GET /users/:id => Fetch details of a specific user by ID.
3. POST /user  => Add a new user.
4. PUT /user/:id  => Update details of an existing user.
5. DELETE /user/:id  => Delete a user by ID.
6. DELETE /users  => Delete all users.

------------------------------------MIDDLEWARES =>
1. MiddleWare 1 
middleware to log the details of each request (e.g., method, URL, status
code)

2. Middleware 2 
 Implement validation middleware to check for required fields in the POST and PUT
 routes.

3. Middleware 3 
Implement to check invalid URL

4. Middleware 4
Implement for error handling ( if incorrect json file )

----------------------- Error handling =>
1. 404 : user list empty
2. 200 OK: Used for successful GET requests
3. 201 Created: Used for successful POST requests 
