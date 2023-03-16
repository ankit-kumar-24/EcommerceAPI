const mongoose = require("mongoose")
const jwt = require("jsonwebtoken") 
const dotenv = require("dotenv").config()

const UserSchema = new mongoose.Schema({
    username : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    isAdmin : {
        type : Boolean,
        default : false,
    },
    tokens: [{
        token : {
            type: String,
            required: true
        }
    }]
},
{ timestamps : true}
)

UserSchema.methods.generateAuthTokens = async function(){
    try {
        const token = jwt.sign({_id : this._id.toString()}, process.env.SECRET_KEY)
        console.log(token)
        this.tokens = this.tokens.concat({token:token})
        return token;
        await this.save()
    } catch (error) {
        res.send("The error is " +error)
        console.log("The error is " +error)
    }
}



module.exports = mongoose.model("User", UserSchema)