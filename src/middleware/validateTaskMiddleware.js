function isEmptyBody(body) {
    return !body || Object.keys(body).length === 0;
}

function validateTaskAttributes(task) {
    const errors = [];

    if (!task.description) {
        errors.push("El campo 'description' es requerido");
    } else if (typeof task.description !== 'string') {
        errors.push("El campo 'description' debe ser una cadena de texto");
    } else if (task.description.trim() === '') {
        errors.push("El campo 'description' no puede estar vacío");
    }

    if (task.hasOwnProperty('isCompleted') && typeof task.isCompleted !== 'boolean') {
        errors.push("El campo 'isCompleted' debe ser un valor booleano (true o false)");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function validatePostTask(req, res, next) {
    if (req.method !== 'POST') {
        return next();
    }

    if (isEmptyBody(req.body)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El cuerpo de la solicitud POST no puede estar vacío'
        });
    }

    const validation = validateTaskAttributes(req.body);
    
    if (!validation.isValid) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'La información de la tarea no es válida',
            errors: validation.errors
        });
    }

    next();
}


function validatePutTask(req, res, next) {
    if (req.method !== 'PUT') {
        return next();
    }

    if (isEmptyBody(req.body)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'El cuerpo de la solicitud PUT no puede estar vacío'
        });
    }

    const { description, isCompleted } = req.body;
    const errors = [];

    if (description !== undefined) {
        if (typeof description !== 'string') {
            errors.push("El campo 'description' debe ser una cadena de texto");
        } else if (description.trim() === '') {
            errors.push("El campo 'description' no puede estar vacío");
        }
    }

    if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        errors.push("El campo 'isCompleted' debe ser un valor booleano (true o false)");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'La información de la tarea no es válida',
            errors: errors
        });
    }

    next();
}

function validateTaskRequests(req, res, next) {
    if (req.method === 'POST') {
        return validatePostTask(req, res, next);
    } else if (req.method === 'PUT') {
        return validatePutTask(req, res, next);
    }
    next();
}

module.exports = {
    validatePostTask,
    validatePutTask,
    validateTaskRequests
};