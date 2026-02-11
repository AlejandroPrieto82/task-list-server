const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use("/api", listViewRouter);
app.use("/api", listEditRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
