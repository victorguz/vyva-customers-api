"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const aws_serverless_express_1 = require("aws-serverless-express");
const main_1 = require("./main");
const express = require('express');
let cachedServer;
async function bootstrap() {
    const expressApp = express();
    const app = await (0, main_1.createApp)(expressApp);
    await app.init();
    return (0, aws_serverless_express_1.createServer)(expressApp);
}
async function handler(event, context) {
    if (!cachedServer) {
        const server = await bootstrap();
        cachedServer = server;
    }
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
}
//# sourceMappingURL=lambda.js.map