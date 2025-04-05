const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express(); // Corrected typo here
const port = process.env.PORT || 8000; // Default to 8000 if PORT is not set in .env

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
