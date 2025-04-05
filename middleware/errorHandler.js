const {
    VALIDATION_ERROR,
    UNAUTHORIZED,
    FORBIDDEN,
    SERVER_ERROR
} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Use err.statusCode instead of res.statusCode

    // Handle Mongoose CastError for invalid ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({
            title: "Invalid ID format",
            message: `The ID ${err.value} is not a valid ObjectId`,
            stackTrace: err.stack
        });
    }

    // Handle other errors based on their status code
    switch (statusCode) {
        case VALIDATION_ERROR:
            return res.status(statusCode).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
        case UNAUTHORIZED:
            return res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
        case FORBIDDEN:
            return res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
        case SERVER_ERROR:
            return res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
        default:
            return res.status(statusCode).json({
                title: "Unknown Error",
                message: err.message,
                stackTrace: err.stack
            });
    }
};

module.exports = errorHandler;
