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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const shared_functions_1 = require("../../shared/shared.functions");
const uuid_1 = require("uuid");
const generic_response_interface_1 = require("../../core/interfaces/generic-response.interface");
const error_functions_1 = require("../../shared/error.functions");
let CustomersService = class CustomersService {
    constructor(model) {
        this.model = model;
    }
    async findAll(user) {
        try {
            const customers = await this.model
                .scan()
                .where('businessId')
                .eq(user.businessInfoId)
                .exec();
            return new generic_response_interface_1.GenericResponse(customers.map((customer) => customer.serialize('frontend')));
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async findOne(id, user) {
        try {
            const customer = await this.model.get({ id });
            if (!customer) {
                throw new Error('MS007');
            }
            const customerData = customer.toJSON();
            if (customerData.businessId !== user.businessInfoId) {
                throw new Error('MS007');
            }
            return new generic_response_interface_1.GenericResponse(customerData);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async findOneByEmail(email, user) {
        try {
            const customers = await this.model
                .scan()
                .where('email')
                .eq(email.toLowerCase())
                .where('businessId')
                .eq(user.businessInfoId)
                .exec();
            if (!customers || customers.length === 0) {
                throw new Error('MS007');
            }
            const customerData = customers[0].toJSON();
            return new generic_response_interface_1.GenericResponse(customerData);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async findByUserId(userId, user) {
        try {
            const customers = await this.model
                .scan()
                .where('userId')
                .eq(userId)
                .where('businessId')
                .eq(user.businessInfoId)
                .exec();
            return new generic_response_interface_1.GenericResponse(customers.map((customer) => customer.toJSON()));
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async create(body, user) {
        try {
            const customerObj = (0, shared_functions_1.deleteEmptyProperties)({
                id: (0, uuid_1.v4)(),
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email ? body.email.toLowerCase() : undefined,
                role: body.role || 'customer',
                status: body.status !== undefined ? body.status : true,
                documentType: body.documentType,
                documentNumber: body.documentNumber,
                phone: body.phone,
                typePerson: body.typePerson || 'natural',
                gender: body.gender,
                dateOfBirth: body.dateOfBirth,
                country: body.country,
                city: body.city,
                address: body.address,
                profilePicture: body.profilePicture,
                userId: body.userId,
                businessId: user.businessInfoId,
                data: body.data,
                createdAt: moment().toISOString(),
                updatedAt: moment().toISOString(),
            });
            const newCustomer = await this.model.create(customerObj);
            const customerData = newCustomer.toJSON();
            return new generic_response_interface_1.GenericResponse(customerData);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async update(id, updateCustomerDto, user) {
        try {
            const existingCustomer = await this.model.get({ id });
            if (!existingCustomer) {
                throw new Error('MS007');
            }
            const existingCustomerData = existingCustomer.toJSON();
            if (existingCustomerData.businessId !== user.businessInfoId) {
                throw new Error('MS007');
            }
            if (updateCustomerDto.email && updateCustomerDto.email.trim() !== '') {
                updateCustomerDto.email = updateCustomerDto.email.toLowerCase();
            }
            const { businessId: _, ...updateData } = updateCustomerDto;
            const cleanedUpdateData = { ...updateData };
            if (cleanedUpdateData.email === '' ||
                cleanedUpdateData.email === null ||
                cleanedUpdateData.email === undefined) {
                delete cleanedUpdateData.email;
            }
            const finalUpdateData = (0, shared_functions_1.deleteEmptyProperties)(cleanedUpdateData);
            await this.model.update({ id }, finalUpdateData);
            const updatedCustomer = await this.model.get({ id });
            if (!updatedCustomer) {
                throw new Error('MS007');
            }
            const customerData = updatedCustomer.toJSON();
            return new generic_response_interface_1.GenericResponse(customerData);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async remove(id, user) {
        try {
            const customer = await this.model.get({ id });
            if (!customer) {
                throw new Error('MS007');
            }
            const customerData = customer.toJSON();
            if (customerData.businessId !== user.businessInfoId) {
                throw new Error('MS007');
            }
            await this.model.update({ id }, { status: false });
            return new generic_response_interface_1.GenericResponse(undefined);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
    async getCustomersCount(user) {
        try {
            const allCustomers = await this.model
                .scan()
                .attributes(['businessId', 'createdAt'])
                .where('businessId')
                .eq(user.businessInfoId)
                .exec();
            const today = moment().startOf('day');
            const endOfDay = moment().endOf('day');
            const todayISO = today.toISOString();
            const customersRegisteredToday = allCustomers.filter((customer) => {
                const customerDate = moment(customer.createdAt);
                return customerDate.isBetween(today, endOfDay, null, '[]');
            });
            const response = {
                totalCustomers: allCustomers.length,
                customersRegisteredToday: customersRegisteredToday.length,
            };
            return new generic_response_interface_1.GenericResponse(response);
        }
        catch (error) {
            throw (0, error_functions_1.handleError)(error);
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_dynamoose_1.InjectModel)('Customer')),
    __metadata("design:paramtypes", [Object])
], CustomersService);
//# sourceMappingURL=customers.service.js.map