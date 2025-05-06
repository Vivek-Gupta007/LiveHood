const express = require('express')
const app = express()
const methodOverride = require('method-override')

const mongoose = require('mongoose')
const listing = require('./models/listing')

app.use(methodOverride("_method"))

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

app.get("/", (req, res) => {
    res.send("Server Working perfectly")
})

app.get("/listing", async (req, res) => {
    const list = new listing({
        title: "New Location",
        description: "UN Revealed",
        price: 1200,
        location: "Not Revealed",
        country: "India",
    })

    await list.save()
    res.send("List Added")
    console.log("Listing is Save")
})

app.listen(8080, ()=>{
    console.log("Listen Server at port: 8080")
})