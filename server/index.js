const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res) => {
    res.status(200).send("Hello World!!");
});

app.listen(PORT,() => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});