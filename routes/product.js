const router = require("express").Router()
const Product = require("../models/Product")
const bcrypt = require("bcrypt")

// Create product
router.post("/", async(req, res) => {
    const newproduct = new Product(req.body);

    try {
        const savedproduct = await newproduct.save();
        res.status(200).json(savedproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update product
router.put("/:id", async(req,res) => {
    try {
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json(updatedproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete product

router.delete("/:id", async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id, {
            $set:req.body
        },{
            new : true
        })
        res.status(200).json("Product has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get product by id

router.get("/:id", async(req, res) => {
    try {
        const getproduct = await Product.findById(req.params.id)
        res.status(200).json(getproduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get all product

router.get("/", async(req, res) => {
    const qnew = req.query.new;
    const qcategory = req.query.category
    try {
        let products;
        if(qnew){
            products = await Product.find().sort({createdAt : -1}).limit(1)
        }else if(qcategory){
            products = await Product.find({categories : {
                $in : [qcategory],
            }

            });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router