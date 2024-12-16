const cors = require("cors"); //Prevent CORS errors
const express = require("express"); //Use express
const mongoose = require("mongoose"); //Use mongoose
const routes = require("./routes/index"); //Connect to index.js in routes folder
// const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser"); // lấy được cookie bên phía backend


require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options("*", cors());
app.use(cookieParser());
app.use(express.json()); 
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     maxAge: 5 * 60 * 1000,  // Session sẽ hết hạn sau 5 phút
//     sameSite: 'none',  // Cần thiết cho CORS
//     secure: false, // Đặt true nếu bạn dùng HTTPS
//   },
//   genid: (req) => uuidv4(),
// }));


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
