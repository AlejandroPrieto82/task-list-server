const express = require("express");
const router = express.Router();
const tasks = require("../bd/bd");
const { validateTaskId, validateStatusParam } = require("../middleware/validateParamsMiddleware");
const { validateTaskRequests } = require("../middleware/validateTaskMiddleware");

router.post("/tasks", validateTaskRequests, (req, res) => {
    const { description, isCompleted } = req.body;
    const newTask = {
        id: Date.now(),
        description,
        isCompleted: !!isCompleted,
    };
    tasks.push(newTask);
    res.status(201).json({
        message: "Tarea creada exitosamente",
        task: newTask
    });
});

router.put("/tasks/:id", validateTaskId, validateTaskRequests, (req, res) => {
    const id = req.validatedId;
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
        return res.status(404).json({ 
            error: "Not Found",
            message: "Tarea no encontrada" 
        });
    }

    const { description, isCompleted } = req.body;
    if (description !== undefined) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    res.status(200).json({
        message: "Tarea actualizada exitosamente",
        task: task
    });
});

router.delete("/tasks/:id", validateTaskId, (req, res) => {
    const id = req.validatedId;
    const index = tasks.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({ 
            error: "Not Found",
            message: "Tarea no encontrada" 
        });
    }
    
    const deletedTask = tasks.splice(index, 1);
    res.status(200).json({
        message: "Tarea eliminada exitosamente",
        task: deletedTask[0]
    });
});

router.get("/tasks", (req, res) => {
    res.status(200).json({
        message: "Lista de todas las tareas",
        count: tasks.length,
        tasks: tasks
    });
});

router.get("/tasks/filter/:status", validateStatusParam, (req, res) => {
    const status = req.params.status === "complete";
    const filteredTasks = tasks.filter(t => t.isCompleted === status);
    
    res.status(200).json({
        message: `Tareas ${req.params.status === 'complete' ? 'completas' : 'incompletas'}`,
        count: filteredTasks.length,
        tasks: filteredTasks
    });
});

router.get("/tasks/:id", validateTaskId, (req, res) => {
    const id = req.validatedId;
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
        return res.status(404).json({ 
            error: "Not Found",
            message: "Tarea no encontrada" 
        });
    }
    
    res.status(200).json({
        message: "Tarea encontrada",
        task: task
    });
});

module.exports = router;