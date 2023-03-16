const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("./conn")
const Userroute = require("./routes/user")
const Authroute = require("./routes/auth")
const Productroute = require("./routes/product")
const Orderroute = require("./routes/order")
const Cartroute = require("./routes/cart")



app.use(express.json())
app.use("/api/users", Userroute)
app.use("/api/auths", Authroute)
app.use("/api/products", Productroute)
app.use("/api/carts", Cartroute)
app.use("/api/orders", Orderroute)




app.listen("8000", () => {
    console.log("Backend is running")
})