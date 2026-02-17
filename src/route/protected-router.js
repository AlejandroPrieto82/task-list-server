const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/protected", authenticateToken, (req, res) => {
    res.json({
        message: 'Acceso a ruta protegida exitoso',
        user: req.user
    });
});

module.exports = router;