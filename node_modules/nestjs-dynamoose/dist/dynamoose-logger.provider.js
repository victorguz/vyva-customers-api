"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = void 0;
class LoggerProvider {
    constructor(logger) {
        this.logger = logger;
    }
    log(message) {
        let method;
        switch (message.level) {
            case 'fatal':
            case 'error':
                method = this.logger.error;
                break;
            case 'warn':
                method = this.logger.warn;
                break;
            case 'info':
                method = this.logger.log;
                break;
            case 'debug':
            case 'trace':
                method = this.logger.log;
                break;
        }
        method.bind(this.logger)(message.category
            ? `${message.category} - ${message.message}`
            : message.message);
    }
}
exports.LoggerProvider = LoggerProvider;
