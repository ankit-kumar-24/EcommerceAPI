const router = require("express").Router()
const Order = require("../models/Order")
const bcrypt = require("bcrypt")

// Create Order
router.post("/", async(req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update Order
router.put("/:id", async(req,res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete Order

router.delete("/:id", async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json("Order has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Order by id

router.get("/:id", async(req, res) => {
    try {
        const orders = await Order.findById(req.params.id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Get all Order

router.get("/", async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router