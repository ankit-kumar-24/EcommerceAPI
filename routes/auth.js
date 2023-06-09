const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        hassedpassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hassedpassword
        })
        //const token = await user.generateAuthTokens();
        //console.log("The token is " +token);
        const UserCreate = await user.save();
        res.status(200).json(UserCreate)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credential");

        const validpassword = await bcrypt.compare(req.body.password, user.password)
        !validpassword && res.status(400).json("wrong password");

        const token = await user.generateAuthTokens();

       const {password, ...others} = user._doc
       res.status(200).json(others)


    } catch (error) {
       res.status(500).json(error)
       console.log(error)
    }
})




module.exports = router