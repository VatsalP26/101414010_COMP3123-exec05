const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const user = require('./user.json')

router.use(express.json())
router.use(express.urlencoded({extented:true}))

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.send(JSON.stringify(user));
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req,res) => {
  const { username, password } = req.body;
  if(user.username !== username)
    res.send(JSON.stringify({"status": true,"message": "Username Is invalid"}))
  else if(user.password !== password)
    res.send(JSON.stringify({"status": true,"message": "Password Is invalid"}))
  else
    res.send(JSON.stringify({"status": true,"message": "User Is valid"}))
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.send('<b>Error: Username is required to log out.</b>');
  }

  res.send(`<b>${username} successfully logged out.</b>`);
});


/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.send('This is error router');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));