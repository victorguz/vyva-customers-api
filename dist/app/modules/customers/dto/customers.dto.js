"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersCountResponseDto = exports.CustomerResponseDto = exports.FindOneCustomerDto = exports.UpdateCustomerDto = exports.CreateCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const generic_constants_1 = require("../../../core/constants/generic.constants");
class CreateCustomerDto {
    constructor() {
        this.typePerson = 'natural';
        this.status = true;
        this.role = 'customer';
    }
}
exports.CreateCustomerDto = CreateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the customer',
        example: 'John',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the customer',
        example: 'Doe',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.lastName !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the customer',
        example: 'john.doe@example.com',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.email !== ''),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type of the customer',
        example: 'DNI',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.documentType !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document number of the customer',
        example: '12345678',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.documentNumber !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the customer',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.phone !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address of the customer',
        example: '123 Main St',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.address !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City of the customer',
        example: 'New York',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.city !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of person (natural or legal)',
        example: 'natural',
        required: false,
        default: 'natural',
    }),
    (0, class_validator_1.ValidateIf)((o) => o.typePerson !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "typePerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender of the customer',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.gender !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '2020-07-10 15:00:00.000',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.dateOfBirth !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country of the customer',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.country !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the customer',
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCustomerDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role of the customer',
        default: 'customer',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.role !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Profile picture URL of the customer',
        example: 'https://lh3.googleusercontent.com/a/profile-picture-url',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.profilePicture !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: 'b9c0e5c0-5c9b-11eb-ae93-0242ac130002',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.userId !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business ID (automatically set to current user)',
        example: 'b9c0e5c0-5c9b-11eb-ae93-0242ac130002',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.businessId !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional data',
        required: false,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCustomerDto.prototype, "data", void 0);
class UpdateCustomerDto {
}
exports.UpdateCustomerDto = UpdateCustomerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the customer',
        example: 'John',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.firstName !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the customer',
        example: 'Doe',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.lastName !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email of the customer',
        example: 'john.doe@example.com',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.email !== ''),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type of the customer',
        example: 'DNI',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.documentType !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document number of the customer',
        example: '12345678',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.documentNumber !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the customer',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.phone !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City of the customer',
        example: 'New York',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.city !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address of the customer',
        example: '123 Main St',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.address !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country of the customer',
        example: 'USA',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.country !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of person (natural or legal)',
        example: 'natural',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.typePerson !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "typePerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the customer',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCustomerDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Role of the customer',
        example: 'customer',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.role !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender of the customer',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.gender !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '2020-07-10 15:00:00.000',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.dateOfBirth !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: 'b9c0e5c0-5c9b-11eb-ae93-0242ac130002',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.userId !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Profile picture URL of the customer',
        example: 'https://lh3.googleusercontent.com/a/profile-picture-url',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.profilePicture !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business ID (cannot be updated)',
        example: 'b9c0e5c0-5c9b-11eb-ae93-0242ac130002',
        required: false,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.businessId !== ''),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional data',
        required: false,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCustomerDto.prototype, "data", void 0);
class FindOneCustomerDto {
}
exports.FindOneCustomerDto = FindOneCustomerDto;
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.id !== ''),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneCustomerDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.email !== ''),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(generic_constants_1.maxEmailLength),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindOneCustomerDto.prototype, "email", void 0);
class CustomerResponseDto {
}
exports.CustomerResponseDto = CustomerResponseDto;
class CustomersCountResponseDto {
}
exports.CustomersCountResponseDto = CustomersCountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of registered customers' }),
    __metadata("design:type", Number)
], CustomersCountResponseDto.prototype, "totalCustomers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of customers registered today' }),
    __metadata("design:type", Number)
], CustomersCountResponseDto.prototype, "customersRegisteredToday", void 0);
//# sourceMappingURL=customers.dto.js.map