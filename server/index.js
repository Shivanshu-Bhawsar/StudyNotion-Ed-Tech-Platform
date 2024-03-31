// server creation
const express = require('express');
const app = express();

// importing
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/ContactUs");
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware to parse json request body
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cors());

// connections
dbConnect();
cloudinaryConnect();

// mounting 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/contact", contactRoutes);

// start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

// default route
app.get("/", (req,res) => {
    return res.status(200).json({
		success: true,
		message: 'Your server is up and running....'
	});
});