"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const dynamoose_config_1 = require("./core/config/dynamoose.config");
const environment_config_1 = require("./core/config/environment.config");
const customers_module_1 = require("./modules/customers/customers.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(environment_config_1.configModuleOptions),
            nestjs_dynamoose_1.DynamooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => (0, dynamoose_config_1.dynamooseConfig)(configService),
                inject: [config_1.ConfigService],
            }),
            customers_module_1.CustomersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map