"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datePlusDays = datePlusDays;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.cloneObject = cloneObject;
exports.deleteEmptyProperties = deleteEmptyProperties;
exports.dataComparison = dataComparison;
exports.getOrderedMonthsFromCurrent = getOrderedMonthsFromCurrent;
exports.plainObject = plainObject;
exports.today = today;
exports.todayAt00 = todayAt00;
exports.yesterdayAt00 = yesterdayAt00;
exports.firstDayOfMonthAt00 = firstDayOfMonthAt00;
exports.lastMonthAt00 = lastMonthAt00;
exports.dateDiffHours = dateDiffHours;
exports.formatDate = formatDate;
exports.formatDateToDB = formatDateToDB;
exports.toTitleCase = toTitleCase;
const CryptoJS = require("crypto-js");
const moment = require("moment-timezone");
const generic_constants_1 = require("../core/constants/generic.constants");
const class_validator_1 = require("class-validator");
function datePlusDays(date, days) {
    return days > 0
        ? moment(date).add(days, 'days')
        : moment(date).subtract(Math.abs(days), 'days');
}
function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY);
    data = data.toString();
    return data;
}
function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
}
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function deleteEmptyProperties(obj) {
    const clon = cloneObject(obj);
    for (const key in clon) {
        if (Object.hasOwn(clon, key) && (0, class_validator_1.isEmpty)(clon[key])) {
            delete clon[key];
        }
    }
    return clon;
}
function dataComparison(actual, previous) {
    return previous > 0 ? (actual / previous - 1) * 100 : 0;
}
function getOrderedMonthsFromCurrent() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthNames = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ];
    const last12Months = [];
    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const year = currentYear - Math.floor((i + 11 - currentMonth) / 12);
        last12Months.push({ year, month: monthNames[monthIndex] });
    }
    last12Months.reverse();
    return last12Months;
}
function plainObject(rawObject) {
    const result = {};
    function setNestedKey(key, value) {
        const keys = key.split('.');
        let current = result;
        while (keys.length > 1) {
            const subKey = keys.shift();
            current[subKey] = current[subKey] || {};
            current = current[subKey];
        }
        current[keys[0]] = value;
    }
    for (const [key, value] of Object.entries(rawObject)) {
        if (key.includes('.')) {
            setNestedKey(key, value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
function today() {
    let date = moment(new Date()).tz('America/Bogota');
    return date;
}
function todayAt00() {
    const date = today();
    date.startOf('day');
    return date;
}
function yesterdayAt00() {
    const date = todayAt00().subtract(1, 'days');
    return date;
}
function firstDayOfMonthAt00() {
    let date = todayAt00();
    date.startOf('month');
    return date;
}
function lastMonthAt00() {
    const date = todayAt00();
    date.subtract(1, 'month');
    date.startOf('month');
    return date;
}
function dateDiffHours(date, other) {
    return Math.round((date.getTime() - other.getTime()) / (1000 * 60 * 60));
}
function formatDate(date = moment.now()) {
    return moment(date).tz('America/Bogota');
}
function formatDateToDB(date = moment.now()) {
    return formatDate(date).format(generic_constants_1.DATE_FORMAT.parse.datePg);
}
function toTitleCase(cad, split = ' ') {
    cad = cad ? cad.trim().toLowerCase() : '';
    if ((0, class_validator_1.isNotEmpty)(cad)) {
        let arr = cad.split(split);
        cad = '';
        arr.forEach((e) => {
            if (e) {
                cad += e[0].toUpperCase() + e.substring(1) + ' ';
            }
        });
    }
    return cad;
}
//# sourceMappingURL=shared.functions.js.map