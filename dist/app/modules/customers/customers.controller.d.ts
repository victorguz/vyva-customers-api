import { User } from 'src/app/schemas/user.schema';
import { GenericResponse } from '../../core/interfaces/generic-response.interface';
import { Customer } from '../../schemas/customer.schema';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CustomersCountResponseDto, UpdateCustomerDto } from './dto/customers.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto, user: User): Promise<GenericResponse<Customer>>;
    findAll(user: User): Promise<GenericResponse<Customer[]>>;
    getCustomersCount(user: User): Promise<GenericResponse<CustomersCountResponseDto>>;
    findOne(id: string, user: User): Promise<GenericResponse<Customer>>;
    update(id: string, updateCustomerDto: UpdateCustomerDto, user: User): Promise<GenericResponse<Customer>>;
    remove(id: string, user: User): Promise<GenericResponse<void>>;
}
