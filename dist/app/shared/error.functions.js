"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
exports.findHandledError = findHandledError;
exports.findHandledErrorMessage = findHandledErrorMessage;
const common_1 = require("@nestjs/common");
const error_constants_1 = require("../core/constants/error.constants");
const generic_response_interface_1 = require("../core/interfaces/generic-response.interface");
const environment_config_1 = require("../core/config/environment.config");
function handleError(error, httpStatus) {
    const logger = new common_1.Logger(handleError.name);
    if (!environment_config_1.isProduction) {
        const message = error_constants_1.ERROR_MESSAGES[error.message];
        logger.error('Handled Error: ' + (message ?? error.message), error.stack);
    }
    if (error.response?.handledError == true) {
        return new common_1.HttpException(error.response, error.response.status);
    }
    else if (error.message) {
        return findHandledError(error.message, httpStatus);
    }
    else if (typeof error == 'string') {
        return findHandledError(error, httpStatus ?? common_1.HttpStatus.BAD_REQUEST);
    }
}
function findHandledError(error, httpStatus) {
    const message = error_constants_1.ERROR_MESSAGES[error];
    if (message) {
        return new common_1.HttpException(new generic_response_interface_1.GenericResponse(undefined, false, message, true, error), httpStatus ?? common_1.HttpStatus.BAD_REQUEST);
    }
    const find = error_constants_1.HANDLED_ERRORS.find((val) => error.includes(val.keyword));
    if (find) {
        return new common_1.HttpException(new generic_response_interface_1.GenericResponse(undefined, false, error_constants_1.ERROR_MESSAGES[find.code], true, find.code, find.status), httpStatus ?? find.status);
    }
    else {
        return new common_1.HttpException(new generic_response_interface_1.GenericResponse(undefined, false, error_constants_1.ERROR_MESSAGES.MS027, false, 'MS027', common_1.HttpStatus.INTERNAL_SERVER_ERROR), 500);
    }
}
function findHandledErrorMessage(error) {
    const find = error_constants_1.HANDLED_ERRORS.find((val) => val.keyword == error);
    return find ? error_constants_1.ERROR_MESSAGES[find.code] : error;
}
//# sourceMappingURL=error.functions.js.map