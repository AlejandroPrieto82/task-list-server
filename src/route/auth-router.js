const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require("../bd/users");
require('dotenv').config();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Username y password son requeridos'
        });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Credenciales inválidas'
        });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({
        message: 'Login exitoso',
        token: token
    });
});

module.exports = router;