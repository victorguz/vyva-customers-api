"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const error_constants_1 = require("../constants/error.constants");
const common_1 = require("@nestjs/common");
class GenericResponse {
    constructor(data, success = true, message = error_constants_1.ERROR_MESSAGES.MS003, handledError, code, status) {
        this.success = true;
        this.message = error_constants_1.ERROR_MESSAGES.MS003;
        this.success = success;
        this.message = message;
        this.data = data;
        this.handledError = handledError;
        this.code = code;
        this.status = status ?? (success ? common_1.HttpStatus.OK : common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.GenericResponse = GenericResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GenericResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GenericResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], GenericResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GenericResponse.prototype, "handledError", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GenericResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GenericResponse.prototype, "status", void 0);
//# sourceMappingURL=generic-response.interface.js.map