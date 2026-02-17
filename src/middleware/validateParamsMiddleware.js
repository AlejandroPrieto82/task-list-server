function validateTaskId(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El parámetro ID es requerido'
        });
    }

    const taskId = parseInt(id, 10);
    
    if (isNaN(taskId)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El parámetro ID debe ser un número válido',
            receivedValue: id
        });
    }

    if (taskId <= 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El parámetro ID debe ser un número positivo',
            receivedValue: taskId
        });
    }

    req.validatedId = taskId;
    
    next();
}

function validateStatusParam(req, res, next) {
    const { status } = req.params;

    if (status !== 'complete' && status !== 'incomplete') {
        return res.status(400).json({
            error: 'Bad Request',
            message: "El parámetro 'status' debe ser 'complete' o 'incomplete'",
            receivedValue: status
        });
    }

    next();
}

module.exports = {
    validateTaskId,
    validateStatusParam
};