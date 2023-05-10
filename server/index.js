const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //allows use of req.body


//Global User Variables
let username;
let passw;

//Routes

//USERS

//create new user
app.post("/users", async (req, res) => {
    try {

        const { username, pswrd } = req.body;
        
        const newUser = await pool.query("INSERT INTO users (username, pswrd) VALUES($1, $2)", 
        [username, pswrd]
        );

        res.json(newUser.rows[0]);
    } catch (e) {
        console.log(e.message);
    }
});

//get user
// app.get("/users/:user", async(req, res) => {
//     try {
        
//         const { user } = req.params;
//         var queryResults;
//         var clientResp = 'success';
//         const getUser = await pool.query("SELECT * FROM users WHERE username = $1",
//         [user],
//         (err, results) => {
//             if(err){
//                 clientResp = 'error';
//             }
//             queryResults = Object.assign({}, results);
//         }
//         );

//         res.json(getUser.rows[0]);

//     } catch (e) {
//         console.log(e.message);
//     }
// });


//COURSES

//create new course
app.post("/courses", async (req, res) => {
    try {

        const { username, course } = req.body;
        
        const newCourse = await pool.query("INSERT INTO courses (username, course) VALUES($1, $2)", 
        [username, course]
        );

        res.json(newCourse.rows[0]);
    } catch (e) {
        console.log(e.message);
    }
});

//get course
app.get("/courses/:courseid", async(req, res) =>{
    try {

        const { courseid } = req.params;
        const courses = await pool.query("SELECT * FROM courses WHERE courseid = $1",
        [courseid]
        );
        
        res.json(courses.rows[0]);
    } catch (e) {
        console.log(e.message);
    }
});

//get all courses
app.get("/courses/:user", async(req, res) => {
    try {
        
        const { user } = req.params;

        const getUser = await pool.query("SELECT * FROM courses WHERE username = $1",
        [user]
        );

        res.json(getUser.rows[0]);

    } catch (e) {
        console.log(e.message);
    }
});

//update course
app.put("/courses/:courseid", async (req, res) => {
    try {

        const { courseid } = req.params;
        const { course } = req.body;
        const updateCourse = await pool.query("UPDATE courses SET course = $1 WHERE courseid = $2",
        [course, courseid]
        );

        res.json("Course was updated");
        
    } catch (e) {
        console.log(e.message);
    }
})

//delete course
app.delete("/courses/:courseid", async (req, res) => {
    try {
        
        const { courseid } = req.params;
        const deleteCourse = await pool.query("DELETE FROM courses WHERE courseid = $1",
        [courseid]
        );

        res.json("Course was deleted");

    } catch (e) {
        console.log(e.message);
    }
})

//QUESTIONS

//create new question
app.post("/questions", async (req, res) => {
    try {

        const { courseid, username, question, answer } = req.body;
        
        const newQuestion = await pool.query("INSERT INTO questions (courseid, username, question, answer) VALUES($1, $2, $3, $4)", 
        [courseid, username, question, answer]
        );

        res.json(newQuestion.rows[0]);
    } catch (e) {
        console.log(e.message);
    }
});

//get question
app.get("/questions/:questionid", async (req, res) => {
    try {
        
        const { questionid } = req.params;
        const getQuestion = await pool.query("SELECT * FROM questions WHERE questionid = $1",
        [questionid]
        );

        res.json(getQuestion.rows[0]);

    } catch (e) {
        console.log(e.message);
    }
})

//get all questions
app.get("/questions/:user/:course", async (req, res) => {
    try {

        const { user, course } = req.params;
        const AllQuestions = await pool.query("SELECT * FROM questions WHERE username = $1 AND courseid = $2",
        [user, course]
        );

        res.json(AllQuestions.rows);
        
    } catch (e) {
        console.log(e.message);
    }
})

//update question
app.put("/questions/:questionid", async (req, res) => {
    try {
        
        const { questionid } = req.params;
        const { question, answer} = req.body;
        const updateQuestion = await pool.query("UPDATE questions SET question = $1 WHERE questionid = $2",
        [question, questionid]
        );
        const updateAnswer = await pool.query("UPDATE questions SET answer = $1 WHERE questionid = $2",
        [answer, questionid]
        );

        res.json("Question updated");

    } catch (e) {
        console.log(e.message);
    }
})

//delete question
app.delete("/questions/:questionid", async (req, res) => {
    try {

        const { questionid } = req.params;
        const deleteQuestion = await pool.query("DELETE FROM questions WHERE questionid = $1",
        [questionid]
        );

        res.json("Question Deleted");
        
    } catch (e) {
        console.log(e.message);
    }
})



app.listen(5000, () =>{
    console.log("server started on port: 5000")
});