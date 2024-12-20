import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { user } from '../Users/user.model.js';

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
}, { timestamps: true}


);
export const Category = mongoose.model('Categories', categorySchema);

