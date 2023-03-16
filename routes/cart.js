const router = require("express").Router()
const Cart = require("../models/Cart")
const bcrypt = require("bcrypt")

// Create cart
router.post("/", async(req, res) => {
    const newcart = new Cart(req.body);

    try {
        const savedcart = await newproduct.save();
        res.status(200).json(savedcart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update Cart
router.put("/:id", async(req,res) => {
    try {
        const updatedcart = await Cart.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json(updatedcart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete Cart

router.delete("/:id", async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json("Cart has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Cart by id

router.get("/:id", async(req, res) => {
    try {
        const getCart = await Cart.findById(req.params.id)
        res.status(200).json(getCart)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Get all Cart

router.get("/", async(req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router