const validHttpPmethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];

function validateHttpMethods(req, res, next) {
    if (!validHttpPmethods.includes(req.method)) {
        return res.status(405).json({
            error: 'Method Not Allowed',
            message: `El método HTTP '${req.method}' no es válido o no está permitido en este servidor`,
            allowedMethods: validHttpPmethods
        });
    }
    next();
}

module.exports = validateHttpMethods;