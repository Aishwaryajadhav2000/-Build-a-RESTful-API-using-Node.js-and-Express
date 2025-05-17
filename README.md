
--------------------------------------------Assignment: Build a RESTful API using Node.js and Express ---------------------------------------------


 Created a simple RESTful API for managing a list of users, testing concepts such as routing,
 middleware, HTTP methods, status codes, error handling, and interaction with a data source.

Test  API using  ThunderClient and include screenshots of the test results in attched PDF.
 
------------------------------------------------------- commands To run project-------------------------------------------------
1. Installs all project dependencies =>  npm i 
2. Starts the app using the command  =>   npm start
3. code file => server.js 


----------------------------------------------------------- Git -----------------------------------------------
https://github.com/Aishwaryajadhav2000/-Build-a-RESTful-API-using-Node.js-and-Express



----------------------------------------Installation----------------------------------------------
1. Nodemon - Installed to automatically restarts Node.js server whenever make changes in code.
2. Express - To build APIs and handle routing

-------------------npm start--------------
1. npm start : start server => file server.js


--------------------------------URL------------
    http://localhost:8080/



----------------------------- API's =>
1. GET /users => Fetch the list of all users.
    If no data to display : User List is empty.. Please add new users..

2. GET /users/:id => Fetch details of a specific user by ID.
    If id does not exist : No user found with Id

3. POST /user  => Add a new user.

4. PUT /user/:id  => Update details of an existing user.
    if id not exist : Cannot update..No user found with ID

5. DELETE /user/:id  => Delete a user by ID.
    if id not exist : Cannot Delete..No user found with ID

6. DELETE /users  => Delete all users.
    If list empty : No users to delette



------------------------------------MIDDLEWARES =>
Extra middleware added for more practice  

1. MiddleWare 1 :=>
    1. log the details of each request : method, URL, status code , ip ,
        headers , request body , request query , requested parameters , Time
    
    2. API can calls only from 6am to 10pm


2. Middleware 2 :=>
    1. Implement validation middleware to check for required fields in thePOST and PUT routes.
    2. Validation for skills : should be an array and should not empty.
    3. Validation for experience and age : Must be a number
    4. Validation for is working : must be a boolean
    5. Validation for fullname , profession , email , location : must be a  string
    6. Validation for fullname , profession , email , location : must be non-empty string
    7. Age should be between 18 to 50
    8. Invalid Email format



3. Middleware 3 
Implement to check invalid URL

4. Middleware 4
Implement for error handling ( if incorrect json file )

----------------------- Error handling =>
200 :  for successful GET requests
201 : successfull post request
200 : Successful put request
204 : successful delete request

400 : Bad Request
404 : Not Found
417 : Expectation failed (Inproper JSON format)
410 : Requested page not available (before 6am and after 8pm)
412 Precondition Failed (All validation errors)
502 : Bad Gateway (Invalid URL)


