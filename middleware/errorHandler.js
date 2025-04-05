// // const { constans } = require("../constants");

// // const errorHandler = (err, req, res, next) => {
// //     const statusCode = err.statusCode || 500; // Use err.statusCode instead of res.statusCode

// //     switch (statusCode) {
// //         case constans.VALIDATION_ERROR:
// //             res.status(statusCode).json({
// //                 title: "Validation Error",
// //                 message: err.message,
// //                 stackTrace: err.stack
// //             });
// //             break;
// //         case constans.UNAUTHORIZED:
// //             res.status(statusCode).json({
// //                 title: "Unauthorized",
// //                 message: err.message,
// //                 stackTrace: err.stack
// //             });
// //             break;
// //         case constans.FORBIDDEN:
// //             res.status(statusCode).json({
// //                 title: "Forbidden",
// //                 message: err.message,
// //                 stackTrace: err.stack
// //             });
// //             break;
// //         case constans.SERVER_ERROR:
// //             res.status(statusCode).json({
// //                 title: "Server Error",
// //                 message: err.message,
// //                 stackTrace: err.stack
// //             });
// //             break;
// //         default:
// //             res.status(statusCode).json({
// //                 title: "Unknown Error",
// //                 message: err.message,
// //                 stackTrace: err.stack
// //             });
// //             break;
// //     }
// // };

// // module.exports = errorHandler;

// // errorHandler.js
// const {
//     VALIDATION_ERROR,
//     UNAUTHORIZED,
//     FORBIDDEN,
//     SERVER_ERROR
// } = require("../constants");

// const errorHandler = (err, req, res) => {
//     const statusCode = err.statusCode || 500; // Use err.statusCode instead of res.statusCode

//     if (err.name === "CastError" && err.kind === "ObjectId") {
//         res.status(400).json({
//             title: "Invalid ID format",
//             message: `The ID ${err.value} is not a valid ObjectId`,
//             stackTrace: err.stack
//         });
//         return;
//     }

//     switch (statusCode) {
//         case VALIDATION_ERROR:
//             res.status(statusCode).json({
//                 title: "Validation Error",
//                 message: err.message,
//                 stackTrace: err.stack
//             });
//             break;
//         case UNAUTHORIZED:
//             res.status(statusCode).json({
//                 title: "Unauthorized",
//                 message: err.message,
//                 stackTrace: err.stack
//             });
//             break;
//         case FORBIDDEN:
//             res.status(statusCode).json({
//                 title: "Forbidden",
//                 message: err.message,
//                 stackTrace: err.stack
//             });
//             break;
//         case SERVER_ERROR:
//             res.status(statusCode).json({
//                 title: "Server Error",
//                 message: err.message,
//                 stackTrace: err.stack
//             });
//             break;
//         default:
//             res.status(statusCode).json({
//                 title: "Unknown Error",
//                 message: err.message,
//                 stackTrace: err.stack
//             });
//             break;
//     }
// };

// module.exports = errorHandler;

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
