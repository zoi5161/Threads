const cors = require("cors"); //Prevent CORS errors
const express = require("express"); //Use express
const mongoose = require("mongoose"); //Use mongoose
const routes = require("./routes"); //Connect to index.js in routes folder
require("dotenv").config({ path: "src/config/.env" });

const app = express();

app.use(cors()); //Prevent CORS errors

app.use(express.json()); //Use JSON

app.use("/", routes); //Connect to index.js in routes folder

const MONGODB_URI = process.env.MONGODB_URI; //Connect to MongoDB
mongoose.connect(MONGODB_URI)


const PORT = process.env.PORT || 3000;

const pageRoute = "../frontend/src/pages/"

app.get("/", (_, res) => {
  res.sendFile("home.html", { root: pageRoute + "Home" });
});

app.use(express.static(pageRoute + "Home"));

app.get("/test-page", (_, res) => {
  res.sendFile("test.html", { root: pageRoute + "Test" });
});

app.use(express.static(pageRoute + "Test"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
