const express = require("express");

const app = express();
const PORT = 8080;

app.get("/tasks", (req, res) => {
    const tasks = [
        {
            id: 123456,
            isCompleted: false,
            description: "Walk the dog"
        }
    ];

    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
