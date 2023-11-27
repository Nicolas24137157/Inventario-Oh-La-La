const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
require('dotenv').config()
var jwt = require('jsonwebtoken');

const userHash = '$2a$12$Vvs/syygZY4qxEY.EduzDOYZyyIU6ImfFz0fwO2IagRsoYRWu9dfi'
const passwordHash = '$2a$12$LQjUIQqD8FlumDiOs9bPw.UA4jPhVrNmC.wTsltKTNRO7qTSTHU1q'

//Login
router.post('/', async (req, res) => {   
    const user = req.body['user'];
    const password = req.body['password'];

    const matchUser = await bcrypt.compare(user, userHash);
    const matchPassword = await bcrypt.compare(password, passwordHash);

    if(matchUser && matchPassword) {
        var token = jwt.sign({user: user}, process.env.JWT_SECRET);
        res.json(token) 
    } else {
        res.status(401).json("Credenciales no validas")         
    }
    
})

module.exports = router