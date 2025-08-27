const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { dbConnect } = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect()

app.use('/api/auth', authRoutes);

app.all('/{*splat}', (req, res) => {
    res.status(200).send("Hello World!!");
});

app.listen(PORT,() => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});