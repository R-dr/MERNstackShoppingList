const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

//Db Config
const db = require("./config/keys").mongoURI ;

//connect to mongo

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log(e));

// Use routes
app.use("/api/items", items);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
