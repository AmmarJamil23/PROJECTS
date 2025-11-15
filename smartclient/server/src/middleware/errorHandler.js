const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        status: "error",
        message: "Something went wrong on the server",
    });

};
module.exports = errorHandler;