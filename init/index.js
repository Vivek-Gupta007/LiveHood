const mongoose = require('mongoose')
const Listing = require('../models/listing')
const initData = require('./data')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')

main()
.then(() => {
    console.log("DB Connection Done")
})
.catch((err) => {
    console.log("DB Connection Fail", err)
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/listing")
}

const addData = async () => {
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("init data saved")
}

addData()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"))
app.use(methodOverride('_method'))

// For understand encoded data
app.use(express.urlencoded({extended: true}))

// Main Route
app.get('/listings', async (req, res) => {
    const listingData = await Listing.find({})

    res.render("listing/index.ejs", { listingData })
})

// Navigate to form route
app.get('/listings/form', (req, res) => {
    res.render("listing/form.ejs", {})
})

// Update data route
app.put('/listings/:id', async (req, res) => {
    const id = req.params.id
    let { title, desc, img, price, country, location } = req.body

    await Listing.findByIdAndUpdate(id, { 
        title: title,
        description: desc,
        image: {
            url: img
        },
        price: price,
        country: country,
        location: location,
    })
    res.redirect('/listings')
})

// Edit get route
app.get('/listings/edit/:id', async (req, res) => {
    const id = req.params.id
    const listingData = await Listing.findById(id)
    res.render("listing/editForm.ejs", { listingData })
})

// New collection add route
app.post('/listings/add', async (req, res) => {
    let { title, desc, img, price, country, location } = req.body
    await Listing.insertOne({
        title: title,
        description: desc,
        image: {
            url: img
        },
        price: price,
        country: country,
        location: location,
    })

    res.redirect('/listings')
})

// Show specfic data route
app.get('/listings/:id', async (req, res) => {
    const id = req.params.id
    const listingData = await Listing.findById(id)
    res.render("listing/show.ejs", { listingData })
})

app.listen(8080, ()=>{
    console.log("Listen Server at port: 8080")
})