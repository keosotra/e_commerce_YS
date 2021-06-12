'use strict';
require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 3000;

const bcrypt = require('bcrypt');
const saltRounds = 10;


const { Pool, Client } = require('pg')
let pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'users',
  password: 'password',
  port: 5432,
})
app.use(express.json());
app.use(cors({origin: true, credentials: true}));


app.get("/", (req, res) => {
    res.send("home")
})

app.post("/register", async (req, res) => {
    const {email, name, password} = req.body;
    if(email && name && password){
        const INSERT_QUERY = "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)";
        try {
            //hash password
            let hashPassword = await bcrypt.hash(password, saltRounds);
                //if hashpassword success
            if(hashPassword){
                 const items = await pool.query(INSERT_QUERY, [email, name, hashPassword]);
            }
        } catch (error) {
            console.error(error.message);
            return res.status(404).json("register not success");
        }
        return res.status(200).json("success");
    }
   return res.status(404).json("user not found");
})


app.listen(PORT);
