const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const path = require("path");


const app = express();

// Bodyparser middleware no longer needed so just straight on with express
app.use(express.json());

//Db Config
const db = process.env.MONGODB_URI;

//connect to mongo


mongoose
  .connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

// Use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(path.join(__dirname,"client","build")));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
