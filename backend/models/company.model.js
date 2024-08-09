import mongoose from "mongoose";


const companySchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        unique: true
    },

    description: {
        type: String,
        require: true
    },

    location: {
        type: String,
        require: true
    },

    website: {
        type: String,
    },

    logo: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

export const Company = mongoose.model("Company", companySchema)