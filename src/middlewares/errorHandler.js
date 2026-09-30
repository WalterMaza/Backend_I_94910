export function errorHandler(err, req, res, next) {
    return res.status(400).json({
        status: "error",
        message: err.message
    });
}