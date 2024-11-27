const cors = require("cors"); //Prevent CORS errors
const express = require("express"); //Use express
const mongoose = require("mongoose"); //Use mongoose
const routes = require("./routes/index"); //Connect to index.js in routes folder
require("dotenv").config({ path: "src/config/.env" });

const app = express();

app.use(cors(
  {
    origin: '*',
    method: '*',
    allowedHeaders: '*',
  }
)); //Prevent CORS errors

app.use(express.json()); //Use JSON

app.use(routes); //Connect to index.js in routes folder

const MONGODB_URI = process.env.MONGODB_URI; //Connect to MongoDB
mongoose.connect(MONGODB_URI)
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB successfully"))
//     .catch(err => console.error("MongoDB connection error:", err));
    
const PORT = process.env.PORT || 10000;

app.get('/', (_, res) => {
  res.send('Backend side!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
