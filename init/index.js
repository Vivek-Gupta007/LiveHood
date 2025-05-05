const mongoose = require('mongoose')
const Listing = require('../models/listing')
const initData = require('./data')
const express = require('express')
const app = express()
const path = require('path')

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

app.get('/listings', async (req, res) => {
    const listingData = await Listing.find({})

    res.render("listing/index.ejs", { listingData })
})

app.listen(8080, ()=>{
    console.log("Listen Server at port: 8080")
})