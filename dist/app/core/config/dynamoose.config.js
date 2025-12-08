"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamooseConfig = void 0;
const dynamooseConfig = (configService) => {
    return {
        aws: {
            accessKeyId: configService.get('ACCESS_KEY_ID'),
            secretAccessKey: configService.get('SECRET_ACCESS_KEY'),
            region: configService.get('REGION'),
        },
        local: false,
        table: {
            prefix: `${configService.get('NODE_ENV')}-vyva-`,
            create: true,
            initialize: true,
            waitForActive: false,
        },
    };
};
exports.dynamooseConfig = dynamooseConfig;
//# sourceMappingURL=dynamoose.config.js.map