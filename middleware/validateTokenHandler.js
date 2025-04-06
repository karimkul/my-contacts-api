// const asyncHandler = require("./errorHandler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401);
//                 throw new Error("User is not authorized");
//             }
//             req.user = decoded.user;
//             next();
//         });
//     }
//     if (!token) {
//         res.status(401);
//         throw new Error("User is not authorized or token is missing");
//     }
// });

// module.exports = validateToken;

const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if authorization header is available and starts with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract the token

        // Verify the token using jwt
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If token is invalid or expired, send an unauthorized response
                return res
                    .status(401)
                    .json({ message: "User is not authorized" });
            }
            req.user = decoded.user; // Attach user data to the request object
            next(); // Proceed to the next middleware
        });
    } else {
        // If no token is found, respond with an error
        return res
            .status(401)
            .json({ message: "Authorization token is missing" });
    }
};

module.exports = validateToken;
