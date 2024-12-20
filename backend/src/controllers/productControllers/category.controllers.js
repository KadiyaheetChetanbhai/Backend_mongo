import { Category } from "../../models/Products/Category.models.js";
import { user } from "../../models/Users/user.model.js";

export const createCategory = async (req, res) => {

    const userid=req.userId;
    const { category_name, description } = req.body;

    const created_by = await user.findOne({ _id: userid });
    console.log(created_by)
    if (!category_name || !description) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const category = new Category({
            category_name,
            description,
            created_by
        });
        console.log(category)
        await category.save();
        console.log(category)
        res.status(201).json({ status: 201, category });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: { error }, message: "Internal server error" });
    }
}
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: 200, categories });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getallCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: 200, categories });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateCategory = async (req, res) => {
    const { category_name, description } = req.body;

    if (!category_name || !description) {
        return res.status(400).json({ message: "All fields are required" })
    }


    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, {
            category_name,
            description,
        }, { new: true });
        res.status(200).json({ status: 200, category });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteCategory = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Category id is required" })
    }
    try {
        await Category.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ status: 200, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}