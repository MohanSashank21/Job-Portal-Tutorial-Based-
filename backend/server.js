const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// middleware to handle cors

app.use(
  cors({
    origin:"*",
    methods : ["POST","GET","PUT","DELETE"],
    allowedHeaders : ["content-Type","Authorization"],
  })
);

//Connect Database
connectDB();

//MiddleWare
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

//serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

const PORT = process.env.PORT || 5011;

app.listen(PORT,()=>console.log(`server is running on the port ${PORT}`));
