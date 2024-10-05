import express from "express";
import path from "path";
import fs from "fs";

//  STEP 1: initialize an express app

const app = express();
//Middleware
app.use(express.urlencoded());

//Route | index route
app.get("/", (req, res) => {
  console.log(req);
  res.send("hello i am response");
});

app.get("/aanajan", (req, res) => {
  console.log(req);
  res.send("<b>Hello anajan</b>");
});

//base dir name
const _dirname = path.resolve();

//sign up route
//1.provide client with html file
// service  side renderring
app.get("/signup", (req, res) => {
  res.sendFile(_dirname + "/signup.html");
});

app.get("/login", (req, res) => {
  res.sendFile(_dirname + "/login.html");
});

//2. POST route from signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  //store email and password in csv file
  const emailPasswordString = email + " | " + password + "\n";

  //get the file
  const fileName = _dirname + "/userList.csv";

  // write to the file
  fs.appendFile(fileName, emailPasswordString, (error) => {
    error ? console.log("error") : console.log("Data saver");
  });
  res.send("<p> thankyou for registering!! <a href='/login'>Login</a></p>");
});

//3. GET route from login
app.get("/login", (req, res) => {
  res.sendFile(_dirname + "/login.html");
});

//4. POST route from login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const emailPasswordString = email + " | " + password;
  //get the file
  const fileName = _dirname + "/userList.csv";

  //read the file
  fs.readFile(fileName, (error, data) => {
    if (error) {
      return res.send(error.message);
    }
    const userList = data.toString();
    userList.includes(emailPasswordString)
      ? res.send("<p>Login successfull, welcome <p>")
      : res.send("invalid password");
  });
});

// get request for date
app.get("/date", (req, res) => {
  console.log(req);
  const date = new Date();
  res.send(date.toDateString());
});

const PORT = 8000;

// STEP 2: Run a server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("your server is running at  http://localhost:" + PORT);
});
