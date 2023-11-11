const express = require('express')
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Hashing = require('./Utils/Hashing');
const app = express()
const port = 3000
const Registration = require('./public/js/registrationmodel');
const db = require('./public/js/db')
app.use('/public', express.static('public'));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));

app.get('/',function(req, res){
    res.render('login');
});

// app.post('/loginrreq', async (req, res) => {
//     const enteredEmail = req.body.email;
//     const enteredPassword = req.body.password;
  
//     // Retrieve the stored hash from the database based on enteredEmail
//     const storedHash = await Registration.findOne({ email: enteredEmail }).select('hashedPassword');
  
//     if (storedHash) {
//       const isPasswordCorrect = await Hashing.verifyPassword(enteredPassword, storedHash);
  
//       if (isPasswordCorrect) {
//         // Authenticate the user and update the session state
//         const user = await Registration.findOne({ email: enteredEmail });
//         req.session.userId = user._id;
//         req.session.username = user.firstName;
  
//         // Set the session cookie
//         res.cookie('sessionId', req.session.id, { secure: true });
  
//         // Redirect to the appropriate page
//         if (user.accountType === 'Teacher') {
//           res.redirect('/teacher');
//         } else {
//           res.redirect('/student');
//         }
//       } else {
//         // Inform the user that the password is incorrect
//         res.send('Incorrect password');
//       }
//     } else {
//       // Display an error message or redirect to the login page
//       res.send('Email address not found');
//     }
//   });
  





app.get('/signup',function(req,res){
    res.render('signup');
})

app.get('/teacher',function(req,res){
    res.send("you are logged in as a teacher ");
})

app.get('/student',function(req,res){
    res.send("you are loogged in as student.");
})
// app.post('/registerreq',function(req,res){
//     // res.send("registered successfully.");
//     const username = req.body['first name']
//     res.send(username)
//     // const 
//     // res.send("registered")
//     // console.log(details)
// })
app.post('/registerreq', async (req, res) => {
        const firstName = req.body['first name'];
        const accountType = req.body['account-type'];
        const age = req.body.age;
        const bio = req.body.bio;
        const email=req.body.email;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        console.log(password);
        // const hashedPassword = await Hashing.generateHashedPassword(password,salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newRegistration = new Registration({
        firstName:firstName,
        accountType:accountType,
        age:age,
        bio:bio,
        email:email,
        
        password:hashedPassword
    });
  
        try {
            console.log(email);
        await newRegistration.save();
        console.log('Registration data saved to the database');
        
        res.render('login');
        } catch (err) {
        console.error(err);
        res.status(500).send('Registration failed');
        }
        
    });




app.listen(port, () => console.log(`listening on port ${port}!`))