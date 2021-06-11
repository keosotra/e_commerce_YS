'use strict';
require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 3000;


app.use(express.json());
app.use(cors({origin: true, credentials: true}));


app.get("/", (req, res) => {
    res.send("success")
})

app.get("/root2", (req, res) => {
    res.send("SUcccess2")
})

app.listen(PORT);
