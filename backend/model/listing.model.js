import mongoose from "mongoose";


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        require: true

    },
    landMark: {
        type: String,
        require: true

    },
    category: {
        type: String,
        require: true

    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    // New fields for enhanced features
    guests: {
        type: Number,
        default: 2
    },
    bedrooms: {
        type: Number,
        default: 1
    },
    bathrooms: {
        type: Number,
        default: 1
    },
    amenities: {
        type: [String],
        default: []
    },
    highlights: {
        type: [String],
        default: []
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String,
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    totalReviews: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }


}, { timestamps: true })

const Listing = mongoose.model("Listing", listingSchema)

export default Listing
