import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import{ user } from '../Users/user.model.js';

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
    },
    product_description: {
        type: String,
        required: true,
        trim: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true }
);
export const Product = mongoose.model('Products', productSchema);