"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Logger_1 = require("../Logger");
const Exception_1 = require("../Exception");
const errorHandler = (error, req, res, next) => {
    Logger_1.Logger.error(error.message);
    if (error instanceof Exception_1.Exception) {
        res.status(error.status).json({
            error: {
                message: error.message,
                status: error.status,
            },
        });
    }
    else {
        res.status(500).json({
            error: {
                message: 'Internal server error',
                status: 500,
            },
        });
    }
    next(error);
};
exports.errorHandler = errorHandler;
