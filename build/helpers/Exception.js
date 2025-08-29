"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(message, status = 500) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = 'Exception';
    }
}
exports.Exception = Exception;
