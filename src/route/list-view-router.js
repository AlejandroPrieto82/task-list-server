const express = require("express");
const router = express.Router();
const tasks = require("../bd/bd");

const { validateTaskId, validateStatusParam } = require("../middleware/validateParamsMiddleware");

router.get("/", (req, res) => {
    res.json({ message: "Endpoint GET: Listar todas las tareas", tasks });
});


router.get("/:id", validateTaskId, (req, res) => {
    const id = req.validatedId;
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json({ message: `Endpoint GET: Ver tarea ${id}`, task });
});

router.get("/filter/:status", validateStatusParam, (req, res) => {
    const status = req.params.status === "complete";
    const filteredTasks = tasks.filter(t => t.isCompleted === status);
    res.json({ message: `Endpoint GET: Filtrar tareas ${req.params.status}`, filteredTasks });
});

module.exports = router;