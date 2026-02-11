const express = require("express");
const router = express.Router();
const tasks = require("./db");

router.get("/", (req, res) => {
    res.json({ message: "Endpoint GET: Listar todas las tareas", tasks });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json({ message: `Endpoint GET: Ver tarea ${id}`, task });
});

router.get("/filter/:status", (req, res) => {
    const status = req.params.status === "complete";
    const filteredTasks = tasks.filter(t => t.isCompleted === status);
    res.json({ message: `Endpoint GET: Filtrar tareas ${req.params.status}`, filteredTasks });
});

module.exports = router;
