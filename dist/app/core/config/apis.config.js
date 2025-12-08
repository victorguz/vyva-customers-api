"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
const environment_config_1 = require("./environment.config");
exports.API_URL = {
    solaraAssistant: {
        email: environment_config_1.isProduction
            ? 'https://s8eo26szn4.execute-api.us-east-1.amazonaws.com/prd/'
            : 'https://q6092demn3.execute-api.us-east-1.amazonaws.com/qas/',
    },
};
//# sourceMappingURL=apis.config.js.map