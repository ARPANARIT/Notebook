const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');// hashing the password
var jwt = require('jsonwebtoken');// provide authentication token to user
var fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const JWT_SECRET = 'signature';




// create a new user i.e sign up
//Route 1 : Sign Up    /api/auth/createUser
router.post('/createUser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    // if error exist send bad request 400 status
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // to maintain unique email 
        // check if the email sent already exist in database or not
        let user = await User.findOne({ email: req.body.email });
        //if yes then return 400 bad request status
        if (user) {
            return res.status(400).json({ error: "Email already exists" })
        }
        //hashing password 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,//secure Password
        })
        //provide authentication token
        const data = {
            user: {
                id: user.id //use id generated in db as data
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)//sign the data 
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }


})
// Route : 2 login /api/auth/login
// POST method route
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Enter min 6 character password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    // if error exist send bad request 400 status
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request body
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });//find the user in database with the entered email by client
        if (!user) {
            return res.status(400).json({ error: "Try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);// compare password by the client and stored password in db
        if (!passwordCompare) {
            return res.status(400).json({ error: "Try to login with correct credentials" });
        }
        //provide authentication token if both creds are valid
        const data = {
            user: {
                id: user.id //use id generated in db as data
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)//sign the data 
        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route:3 Get user details using jwt token login required
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")// show details except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router