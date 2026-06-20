export default function errorHandler(err, req, res, next) {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    switch (statusCode) {
        case 400:
            message = err.message || "Bad Request";
            break;

        case 401:
            message = err.message || "Unauthorized";
            break;

        case 403:
            message = err.message || "Forbidden";
            break;

        case 404:
            message = err.message || "Resource Not Found";
            break;

        case 409:
            message = err.message || "Conflict";
            break;

        case 422:
            message = err.message || "Validation Failed";
            break;

        default:
            statusCode = 500;
            message = err.message || "Internal Server Error";
            break;
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    if (err.code === 11000) {
        statusCode = 409;
        message = "Resource already exists";
    }


    if (err.name === "ValidationError") {
        statusCode = 422;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};