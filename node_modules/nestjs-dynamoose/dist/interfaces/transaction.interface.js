"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSupport = void 0;
const dynamoose = require("dynamoose");
class TransactionSupport {
    transaction(transactions, settings, callback) {
        return dynamoose.transaction(transactions, settings, callback);
    }
}
exports.TransactionSupport = TransactionSupport;
