import express from "express";

const app = express();

//Parse incoming request with JSON payloads
app.use(express.json());

//Users Data storing in users array
const users = [
    {
        "id": 1,
        "fullname": "Aishwarya Jadhav",
        "profession": "Software Developer",
        "location": "Mumbai ",
        "experience": 3,
        "skills": ["JavaScript", "Node.js", "React"],
        "email": "aishwarya.jadhav@example.com",
        "isWorking": true
    },
    {
        "id": 2,
        "fullname": "Arti Acharekar",
        "profession": "Database Dev",
        "location": "USA",
        "experience": 1,
        "skills": ["SQL", "Oracle", "data modeling"],
        "email": "arti.achrekar@example.com",
        "isWorking": true

    },
    {
        "id": 3,
        "fullname": "Mandar Pansare",
        "profession": "Government Employee",
        "location": "Mumbai",
        "experience": 5,
        "skills": ["HTML", "CSS", "JAVA"],
        "email": "mandar.pansare@example.com",
        "isWorking": false

    }
];

//MiddleWare 1
//Use middleware to log the details of each request (e.g., method, URL, status code). 
app.use((req, res, next) => {

    //condition for the time : allow to call apis only between 6am to 8pm(it used mostly in productions)
    const curTime = new Date();
    const curHours = curTime.getHours();
    if (curHours < 6 || curHours > 20) {
        console.log("API access is allowed only from 6am to 8pm")

        return res.status(403).json({
            error: "Access Denied...",
            message: "API access is allowed only from 6am to 8pm"
        });
    }

    // Log status code after response is sent
    res.on("finish", () => {
        const currentTime = new Date().toISOString()
        console.log("=== Incoming Request ============");

        //Log the HTTP method used to (GET ,POST , etc);
        console.log(`Method  :  ${req.method}`);

        //Logs Original Requesed URL
        console.log(`URL  :  ${req.originalUrl} `);

        //Logs the IP address of request
        console.log(`IP Address  :  ${req.ip}`);

        //Logs haders in the requests
        console.log(`HEaders  :  ${JSON.stringify(req.headers)}`);

        //Logs body of request (GET , PUT , POST, etc )
        console.log(`Body  :  ${JSON.stringify(req.body)}`);

        //Logs query parameters
        console.log(`Query Params  :  ${JSON.stringify(req.query)}`);

        //logs route parameters
        console.log(`Route Params  :  ${JSON.stringify(req.params)}`);

        //logs status (200 , 200, 400, 401, etc)
        console.log(`Status  :  ${res.statusCode}`);

        //logs time
        console.log(`timeadded : ${currentTime}`);
        console.log("=================================");

    });

    //continue
    next();
});


// MiddleWare 2
// Implement validation middleware to check for required fields in the POST and PUT routes.
function userValidation(req, res, next) {
    const { fullname, profession, location, experience, skills, email, isWorking } = req.body;

    //If required field is missing
    if (fullname === undefined ||
        profession === undefined ||
        location === undefined ||
        experience === undefined ||
        skills === undefined ||
        email === undefined ||
        isWorking === undefined) {
        return res.status(400).json({ message: "All fields (fullname , profession , location , experience , skills , email , isWorking) are required" });
    }

    //Skills validation - should add in array
    if (!Array.isArray(skills)) {
        return res.status(400).json({
            error: "Validation Error",
            message: "Skills should be in an array"
        });
    }

    //Skills validation - add atleast one skill
    if (skills.length === 0) {
        return res.status(400).json({
            error: "Validation Error",
            message: "Add atleast one skill"
        });
    }

    //Validattion for - experience should be a number
    if (typeof experience !== 'number' || isNaN(experience)) {
        return res.status(400).json({
            error: "Validation Error",
            message: "Experience must be a number"
        });
    };

    //Validate for isWorking
    if (typeof isWorking !== 'boolean') {
        return res.status(400).json({
            error: "Validation Error",
            message: "isWorking must be a boolean (true or false)"
        });
    };

    //validation for - Fullname, profession, email and location
    if (typeof fullname !== "string" ||
        typeof profession !== "string" ||
        typeof location !== "string" ||
        typeof email !== "string") {
        return res.status(400).json({
            error: "Validation Error",
            message: "Fullname, profession, email and location must be strings"
        });
    }


    //continue
    next();
}

//Fetch the list of all users.
app.get("/users", (req, res) => {

    //Message to show when user list is empty
    if (users.length == 0) {
        return res.status(404).json({ message: "User List is empty.. Please add new users.." })
    }
    res.status(200).json({ message: `Users fetch successfully..`, users: users }); // Return 200 for successfull
});

//Fetch details of a specific user by ID.
app.get("/users/:id", (req, res) => {

    const userId = Number(req.params.id); // Convert userid to number
    const user = users.find(user => user.id === userId);

    //if user id not exist
    if (!user) {
        return res.status(404).json({
            error: "User not found",
            message: `No user found with Id : ${userId}`
        }); //Return 404 Not found error 
    }

    //return 200 for successsfull
    res.status(200).json({ message: `User data fetch successfully..`, user: user });
})


//Add a new user.
app.post("/user", userValidation, (req, res) => {
    const { fullname, profession, location, experience, skills, email, isWorking } = req.body;
    const createId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

    //newUser
    const newUser = {
        id: createId,
        fullname: fullname,
        profession: profession,
        location: location,
        experience: experience,
        skills: skills,
        email: email,
        isWorking: isWorking

    };
    users.push(newUser);
    //Return 201 for creating user successfully
    res.status(201).json({ message: "User Created Successfully", user: newUser }).send(users)
})

//Update details of an existing user.
app.put("/user/:id", userValidation, (req, res) => {
    const userId = Number(req.params.id); // Convert userid to number
    const user = users.find(user => user.id === userId);

    //if user id not exist
    if (!user) {
        //Return 404 if user not exist
        return res.status(404).json({
            error: "User not found",
            message: `Cannot update..No user found with ID : ${userId}  `
        });
    }

    const keys = Object.keys(req.body);
    keys.forEach(key => {
        if (key !== "id") user[key] = req.body[key];
    });

    //return 200 for update user successfull
    res.status(200).json({ message: "User Updated successfully..", users: users }).send(user); // Send updated user 
});


//Delete a user by ID.
app.delete("/user/:id", (req, res) => {
    const userId = Number(req.params.id); // Convert userid to number
    const user = users.findIndex(user => user.id === userId);

    //If user id not exist
    if (user === -1) {
        return res.status(404).json({
            error: "User not found",
            message: `Cannot Delete..No user found with ID : ${userId}`
        });
    }
    users.splice(user, 1);

    //Return 200 for deleted successfully
    res.status(200).json({ message: "User Deleted successfully", users: users })
})

//Delete all users
app.delete("/users", (req, res) => {

    // return 404 if list is empty
    if (users.length === 0) {
        return res.status(404).json({ message: "No users to delette" });
    }

    //clear all users
    users.length = 0

    //Return response 200
    res.status(200).json({ message: "All users have been deleted" });

})

//Server start
app.listen(5100, () => {
    console.log("Server is running on port 5100");
});


// MiddleWare3
// For invalid routing
app.use((req, res) => {
    res.status(404).json({
        error: "Invalid routing",
        message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
    })
})

//  middleware 4 => Error-handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: "Invalid JSON",
            message: "Please check your request body. Make sure JSON is properly formatted."
        });
    }
    next(err); // Pass to default error handler if not a JSON error
});

