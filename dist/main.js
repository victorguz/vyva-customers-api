"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const requestIp = require("request-ip");
const app_module_1 = require("./app/app.module");
const cors = {
    origin: getOrigin(),
    methods: 'POST,OPTIONS,GET,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Application, Origin, Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
};
function getOrigin() {
    switch (process.env.NODE_ENV) {
        case 'prd':
            return 'https://app.vyvapos.com';
        case 'dev':
        case 'qas':
        default:
            return '*';
    }
}
async function bootstrap(expressApp = undefined, port = undefined) {
    const app = expressApp == undefined
        ? await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['log', 'debug', 'error', 'verbose', 'warn'],
            bufferLogs: true,
        })
        : await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.setGlobalPrefix('api');
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    app.enableCors(cors);
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: true,
        stopAtFirstError: true,
        whitelist: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Vyva Backend')
        .setDescription('Description...')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.use(requestIp.mw());
    if (port !== undefined) {
        await app.listen(port);
    }
    return app;
}
async function createApp(expressApp) {
    return bootstrap(expressApp);
}
bootstrap(undefined, Number(process.env.PORT));
//# sourceMappingURL=main.js.map