"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.UserSchema = new dynamoose_1.Schema({
    id: {
        type: String,
        hashKey: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        index: {
            type: 'global',
            name: 'email-index',
        },
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    documentType: {
        type: String,
        required: false,
        default: '',
    },
    documentNumber: {
        type: String,
        required: false,
        default: '',
    },
    phone: {
        type: String,
        required: false,
    },
    epaycoCustomerId: {
        type: String,
        required: false,
    },
    typePerson: {
        type: String,
        required: false,
        default: 'natural',
    },
    gender: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    businessInfoId: {
        type: String,
        required: true,
        index: {
            type: 'global',
            name: 'businessInfo-index',
        },
    },
    data: {
        type: Object,
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map