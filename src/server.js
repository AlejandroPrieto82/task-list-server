const express = require("express");
require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(express.json());

const validateHttpMethods = require("./middleware/validateHttpMethods");
app.use(validateHttpMethods);

const tasksRouter = require("./route/tasks-router");
const authRouter = require("./route/auth-router");
const protectedRouter = require("./route/protected-router");

app.use("/api", tasksRouter);
app.use("/api", authRouter);
app.use("/api", protectedRouter);

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `La ruta ${req.method} ${req.path} no existe en este servidor`
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});