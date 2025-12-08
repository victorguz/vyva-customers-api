"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectModel = void 0;
const common_1 = require("@nestjs/common");
const dynamoose_utils_1 = require("./dynamoose.utils");
const InjectModel = (model) => (0, common_1.Inject)((0, dynamoose_utils_1.getModelToken)(model));
exports.InjectModel = InjectModel;
