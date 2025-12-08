"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNonPrimitiveArray = IsNonPrimitiveArray;
const class_validator_1 = require("class-validator");
function IsNonPrimitiveArray(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsNonPrimitiveArray',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return Array.isArray(value) && value.reduce((a, b) => a && typeof b === 'object' && !Array.isArray(b), true);
                },
            },
        });
    };
}
//# sourceMappingURL=shared.validators.js.map