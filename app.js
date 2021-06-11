'use strict';
require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 3000;


app.use(express.json());
app.use(cors({origin: true, credentials: true}));


app.get("/", (req, res) => {
    res.send("home")
})

app.get("/register", (req, res) => {
    const {email, name, password} = req.body;
    if(email && name && password){
        /**
         * @todo we need database here
         */
       return res.status(200).json("sucesss")
    }
    return res.status(404).json("user does not exist");
})

app.listen(PORT);
