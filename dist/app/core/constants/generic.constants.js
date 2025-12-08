"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_FORMAT = exports.maxPasswordLength = exports.maxEmailLength = exports.maxNameLength = exports.maxDigits = exports.maxDescription = exports.maxCompanyArea = exports.maxCompanySlug = exports.maxCompanyName = exports.maxParameterName = exports.maxItemName = exports.maxGenericCharacters = void 0;
exports.maxGenericCharacters = 15;
exports.maxItemName = 70;
exports.maxParameterName = 70;
exports.maxCompanyName = 70;
exports.maxCompanySlug = 70;
exports.maxCompanyArea = 70;
exports.maxDescription = 300;
exports.maxDigits = 999999999999999;
exports.maxNameLength = 50;
exports.maxEmailLength = 100;
exports.maxPasswordLength = 16;
exports.DATE_FORMAT = {
    parse: {
        dateInput: 'MM[-]DD[-]YYYY',
        datePg: 'YYYY-MM-DD HH:mm:ss.SSS ZZ',
    },
    display: {
        dateInput: 'DD[-]MM[-]YYYY',
        monthYearLabel: 'MM[-]YYYY',
        dateA11yLabel: 'DD[-]MM[-]YYYY',
        monthYearA11yLabel: 'MM[-]YYYY',
    },
};
//# sourceMappingURL=generic.constants.js.map