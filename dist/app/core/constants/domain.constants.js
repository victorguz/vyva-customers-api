"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderStatus = exports.ProductStatus = exports.MembershipDurations = exports.MeasurementUnits = exports.PaymentMethodType = exports.UserRole = exports.UserGender = exports.UserDocumentType = void 0;
var UserDocumentType;
(function (UserDocumentType) {
    UserDocumentType["CC"] = "CC";
    UserDocumentType["TI"] = "TI";
    UserDocumentType["CE"] = "CE";
    UserDocumentType["PP"] = "PP";
})(UserDocumentType || (exports.UserDocumentType = UserDocumentType = {}));
var UserGender;
(function (UserGender) {
    UserGender["M"] = "M";
    UserGender["F"] = "F";
})(UserGender || (exports.UserGender = UserGender = {}));
var UserRole;
(function (UserRole) {
    UserRole["superadmin"] = "superadmin";
    UserRole["admin"] = "admin";
    UserRole["assistant"] = "assistant";
    UserRole["trainer"] = "trainer";
    UserRole["customer"] = "customer";
    UserRole["vyva"] = "vyva";
})(UserRole || (exports.UserRole = UserRole = {}));
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["cash"] = "cash";
    PaymentMethodType["transfer"] = "transfer";
    PaymentMethodType["card"] = "card";
    PaymentMethodType["pse"] = "pse";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
var MeasurementUnits;
(function (MeasurementUnits) {
    MeasurementUnits["und"] = "und";
    MeasurementUnits["ml"] = "ml";
    MeasurementUnits["l"] = "l";
    MeasurementUnits["g"] = "g";
    MeasurementUnits["kg"] = "kg";
    MeasurementUnits["cm"] = "cm";
    MeasurementUnits["m"] = "m";
    MeasurementUnits["day"] = "day";
    MeasurementUnits["minute"] = "minute";
    MeasurementUnits["hour"] = "hour";
})(MeasurementUnits || (exports.MeasurementUnits = MeasurementUnits = {}));
var MembershipDurations;
(function (MembershipDurations) {
    MembershipDurations["oneDay"] = "1";
    MembershipDurations["oneMonth"] = "30";
    MembershipDurations["threeMonths"] = "90";
    MembershipDurations["sixMonths"] = "180";
    MembershipDurations["oneYear"] = "365";
    MembershipDurations["other"] = "Otro";
})(MembershipDurations || (exports.MembershipDurations = MembershipDurations = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["published"] = "published";
    ProductStatus["draft"] = "draft";
    ProductStatus["deleted"] = "deleted";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var SalesOrderStatus;
(function (SalesOrderStatus) {
    SalesOrderStatus["pending"] = "pending";
    SalesOrderStatus["partiallyPaid"] = "partiallyPaid";
    SalesOrderStatus["paid"] = "paid";
    SalesOrderStatus["canceled"] = "canceled";
})(SalesOrderStatus || (exports.SalesOrderStatus = SalesOrderStatus = {}));
//# sourceMappingURL=domain.constants.js.map