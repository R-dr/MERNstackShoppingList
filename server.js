const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const items = require('./routes/api/items')



const app = express()

// Bodyparser middleware
app.use(bodyParser.json())

//Db Config
const db = require('./config/keys').mongoURI

//connect to mongo

mongoose.connect(db)
.then(()=>console.log("MongoDB connected"))
.catch(e => console.log(e))

// Use routes
app.use('/api/items',items)

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`Server started on port ${port}`))