import { Product } from "../../models/Products/Product.model.js";
import { user } from "../../models/Users/user.model.js";

export const addProduct = async (req, res) => {
    
    const userid = req.userId;
    const created_by = await user.findOne({ _id: userid });

    //how to get categoryId from the frontend here 
    const category = req.params.id;
    console.log(category)


    const { product_name, product_description, product_price, product_quantity, product_image } = req.body;
   
    if(!product_name || !product_description || !product_price || !product_quantity || !product_image){
        return res.status(400).json({message:"All fields are required"})
    }

    try {
        const product = new Product({
            product_name,
            product_description,
            product_price,
            product_quantity,
            product_image,
            category,
            created_by

        });
        await product.save();
        console.log(product)
        res.status(201).json({ status: 201, product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products)
        res.status(200).json({ status: 200, products });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateProduct = async (req, res) => {
    const { product_name, product_description, product_price, product_quantity, product_image } = req.body;

    if(!product_name || !product_description || !product_price || !product_quantity || !product_image){
        return res.status(400).json({message:"All fields are required"})
    }

    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
            product_name,
            product_description,
            product_price,
            product_quantity,
            product_image,
        }, { new: true });
        res.status(200).json({ status: 200, product });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteProduct = async (req, res) => {

    if(!req.params.id){
        return res.status(400).json({message:"Product id is required"}) 
    }

    try {
        await Product.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ status: 200, message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}