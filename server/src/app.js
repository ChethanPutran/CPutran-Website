require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth1");
const auth2 = require("./middleware/auth2");
require("./db/connection");
const Register = require("./models/registers");

const app = express();
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/services", auth, (req, res) => {
  //   res.send("This is home page")
  res.render("products");
});
app.get("/learn", auth, (req, res) => {
  //   res.send("This is home page")
  res.render("caarts");
});
app.get("/", (req, res) => {
  //   res.send("This is home page")
  check = auth2(req, res);

  if (check) {
    res.render("welcome2");
  } else {
    res.render("welcome");
  }
});

app.get("/login", (req, res) => {
  //   res.send("This is home page")
  res.render("login");
});

app.get("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);

    // // For single logout
    // req.user.tokens = req.user.tokens.filter((currentElement) => {
    //   return currentElement.token !== req.token;
    // });

    //Logout from all devices
    req.user.tokens = [];

    res.clearCookie("jwt");
    console.log("Logout Sucefully");

    await req.user.save();
    res.render("login");
  } catch (error) {
    res.status(500).render("error500");
  }
});

app.get("/register", (req, res) => {
  //   res.send("This is home page")
  res.render("register");
});

app.get("/products", auth, (req, res) => {
  res.render("products");
});

app.get("/contact", auth, (req, res) => {
  res.render("contact");
});
app.post("/contact", auth, (req, res) => {
  res.render("welcome2");
});
app.get("/about", auth, (req, res) => {
  // console.log(`this is cookie awsm${req.cookies.jwt}`);
  res.render("contact");
});

//Create new user in the database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        country: req.body.country,
        password: password,
      });

      const token = await registerEmployee.generateAuthToken();

      // res.cookie(name,value,[options])
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: false,
      });

      const registered = await registerEmployee.save();
      console.log("The page part" + registered);
      res.status(201).render("welcome");
    } else {
      res.status(201).render("notmatch");
    }
  } catch (error) {
    res.status(400).render("user");
    console.log("Error part page " + error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);
    console.log("Ismatch is ", isMatch);
    console.log("Email is ", useremail);

    if (isMatch) {
      const token = await useremail.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: false,
      });

      res.status(201).render("welcome2");
    } else {
      res.render("invalid");
    }
  } catch (error) {
    res.status(400).render("invalid");
  }
});

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
