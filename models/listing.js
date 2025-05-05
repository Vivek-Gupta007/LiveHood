const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
            filename: String,
            url: {
                type: String,
                default: "https://picsum.photos/seed/picsum/2000/1000"
            },
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
        required: true,
    },
})

const listing = mongoose.model("listing", listingSchema)

module.exports = listing