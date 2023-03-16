const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")



router.put("/:id", async(req, res) => {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body
            },
            { new : true}
            );
        //    const token = await updateUser.generateAuthTokens();
            res.status(200).json(updateUser)
            
        } catch (error) {
            res.status(500).json(error)
        }
    
})




router.delete("/:id", async(req, res) => {
       try {
        
            await User.findByIdAndDelete(req.params.id);
               res.status(200).json("user has been deleted")
           
       } catch (error) {
          res.status(400).json(error)
       }
})

// get

router.get("/v2/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
    
    const {password, tokens, ...others} = user._doc
    res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }

})

// Get all

router.get("/", async(req, res) => {
    const query = req.query.new;
    try {
        const user = query 
        ? await User.find().sort({_id:-1}).limit(1)
        : await User.find()
    
    
    res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }

})



module.exports = router