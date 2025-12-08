"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedAuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const environment_config_1 = require("../../core/config/environment.config");
const user_schema_1 = require("../../schemas/user.schema");
const customer_schema_1 = require("../../schemas/customer.schema");
const auth_guard_1 = require("../auth/guards/auth.guard");
let SharedAuthModule = class SharedAuthModule {
};
exports.SharedAuthModule = SharedAuthModule;
exports.SharedAuthModule = SharedAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: environment_config_1.JWT_EXPIRATION,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            nestjs_dynamoose_1.DynamooseModule.forFeature([
                {
                    name: 'User',
                    schema: user_schema_1.UserSchema,
                    options: {
                        tableName: 'users',
                    },
                },
                {
                    name: 'Customer',
                    schema: customer_schema_1.CustomerSchema,
                    options: {
                        tableName: 'customers',
                    },
                    serializers: {
                        frontend: {
                            include: ['id', 'firstName', 'lastName', 'email', 'phone', 'createdAt'],
                        },
                    },
                },
            ]),
        ],
        providers: [auth_guard_1.AuthGuard],
        exports: [auth_guard_1.AuthGuard, jwt_1.JwtModule, nestjs_dynamoose_1.DynamooseModule],
    })
], SharedAuthModule);
//# sourceMappingURL=shared-auth.module.js.map