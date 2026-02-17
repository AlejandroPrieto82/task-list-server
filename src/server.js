const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

const validateHttpMethods = require("./middleware/validateHttpMethods");
app.use(validateHttpMethods);


const listViewRouter = require("./route/list-view-router");
const listEditRouter = require("./route/list-edit-router");

app.use("/api", listViewRouter);

app.use("/api", listEditRouter);

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `La ruta ${req.method} ${req.path} no existe en este servidor`
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});