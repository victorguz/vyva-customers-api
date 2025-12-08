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
exports.configModuleOptions = exports.EnvironmentVariables = exports.isProduction = exports.JWT_EXPIRATION = exports.Environment = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Joi = require("joi");
var Environment;
(function (Environment) {
    Environment["Development"] = "dev";
    Environment["Production"] = "prd";
    Environment["Quality"] = "qas";
})(Environment || (exports.Environment = Environment = {}));
exports.JWT_EXPIRATION = process.env.NODE_ENV == Environment.Development ? '7d' : '24h';
exports.isProduction = process.env.NODE_ENV == Environment.Production;
class EnvironmentVariables {
}
exports.EnvironmentVariables = EnvironmentVariables;
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "ERROR_LOGS", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SECRET_KEY", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "DB_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "ADMIN_PHONE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "ADMIN_EMAIL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "IAM_SMTP", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_HOST", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_USER", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SMTP_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "EMAIL_SENDER", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "ACCESS_KEY_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SECRET_ACCESS_KEY", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REGION", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "GOOGLE_CLIENT_SECRET", void 0);
const validationSchema = Joi.object({
    NODE_ENV: Joi.string(),
    PORT: Joi.number(),
    ERROR_LOGS: Joi.boolean(),
    JWT_SECRET: Joi.string(),
    SECRET_KEY: Joi.string(),
    ADMIN_PHONE: Joi.string(),
    ADMIN_EMAIL: Joi.string(),
    IAM_SMTP: Joi.string(),
    SMTP_HOST: Joi.string(),
    SMTP_USER: Joi.string(),
    SMTP_PASSWORD: Joi.string(),
    EMAIL_SENDER: Joi.string(),
    ACCESS_KEY_ID: Joi.string().required(),
    SECRET_ACCESS_KEY: Joi.string().required(),
    REGION: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
});
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw Error(errors.toString());
    }
    return validatedConfig;
}
exports.configModuleOptions = {
    validationSchema,
    validate,
    validationOptions: {
        allowUnknown: false,
        abortEarly: true,
    },
};
//# sourceMappingURL=environment.config.js.map