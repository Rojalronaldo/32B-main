const path = require('path')
const productModel = require('../models/productModel');
const { request } = require('http');


const Createproduct = async (req, res) => {
    // check incoming data
    console.log(req.body);
    console.log(req.files);

    //  destucturing incoming data
    const { productName, productPrice, productCategory, productDescription } = req.body;

    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    //check product image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            success: false,
            message: "Image not found!!"
        })
    }

    const { productImage } = req.files;

    // Uploading
    // 1. Generate unique name for each file
    const imageName = `${Date.now()}-${productImage.name}`;

    // 2. define specific path
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)


    // 3. Upload to that path(await | trycatch)
    try {

        await productImage.mv(imageUploadPath)

        // save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productCategory: productCategory,
            productDescription: productCategory,
            productImage: imageName

        })
        const product = await newProduct.save()
        res.status(201).json({
            success: true,
            message: "Product Created!",
            data: product
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

// fetch all products
const getAllProducts = async (req, res) => {
    //#. Try catch
    try {
        //1. Find all the products (Await)
        const products = await productModel.find({})
        //2. Send response
        res.status(201).json({
            "success" : true,
            "message" : "Product fetch successfully!",
            "products" : products
        })
    } catch (error) {
        console.log(error)
    }


}

// fetch single produt
const getProduct = async (req,res) => {

    // received ids from URL
    const productId = req.params.id;

    try{
        const product = await productModel.findById(productId)

    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "Server Error!"
        })
    }

}


module.exports = {
    Createproduct,
    getAllProducts,
    getProduct
}