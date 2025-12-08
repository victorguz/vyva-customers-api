import { Model } from 'nestjs-dynamoose';
import { User } from 'src/app/schemas/user.schema';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Customer, CustomerKey } from '../../schemas/customer.schema';
import { CreateCustomerDto, CustomersCountResponseDto, UpdateCustomerDto } from './dto/customers.dto';
export declare class CustomersService {
    private readonly model;
    constructor(model: Model<Customer, CustomerKey>);
    findAll(user: User): Promise<GenericResponse<Customer[]>>;
    findOne(id: string, user: User): Promise<GenericResponse<Customer>>;
    findOneByEmail(email: string, user: User): Promise<GenericResponse<Customer>>;
    findByUserId(userId: string, user: User): Promise<GenericResponse<Customer[]>>;
    create(body: CreateCustomerDto, user: User): Promise<GenericResponse<Customer>>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, user: User): Promise<GenericResponse<Customer>>;
    remove(id: string, user: User): Promise<GenericResponse<void>>;
    getCustomersCount(user: User): Promise<GenericResponse<CustomersCountResponseDto>>;
}
