
const express = require("express");
const router = express.Router();
const tasks = require("./db");

router.post("/", (req,res) =>{
    res.send("Endpoint POST: Crear y Editar tarea");
});

router.post("/tasks", (req, res) => {
    const { description, isCompleted } = req.body;
    const newTask = {
        id: Date.now(),
        description,
        isCompleted: !!isCompleted,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ message: "Tarea no encontrada" });
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
});

router.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    const { description, isCompleted } = req.body;
    if (description !== undefined) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    res.json(task);
});

module.exports = router;
