"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const expenses_controller_1 = require("./expenses/expenses.controller");
const Logger_1 = require("./helpers/Logger");
const config_1 = require("./config");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Routes
exports.app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});
exports.app.use('/expenses', expenses_controller_1.expensesRouter);
const start = () => {
    exports.app.listen(config_1.config.port, () => {
        Logger_1.Logger.info(`Server listening on port ${config_1.config.port}`);
    });
};
exports.start = start;
