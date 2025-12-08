import { Customer } from '../../../schemas/customer.schema';
export declare class CreateCustomerDto {
    firstName: string;
    lastName?: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
    address?: string;
    city?: string;
    typePerson?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    status?: boolean;
    role?: string;
    profilePicture?: string;
    userId?: string;
    businessId?: string;
    data?: any;
}
export declare class UpdateCustomerDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
    city?: string;
    address?: string;
    country?: string;
    typePerson?: string;
    status?: boolean;
    role?: string;
    gender?: string;
    dateOfBirth?: string;
    userId?: string;
    profilePicture?: string;
    businessId?: string;
    data?: any;
}
export declare class FindOneCustomerDto {
    id?: string;
    email?: string;
}
export declare class CustomerResponseDto implements Customer {
    id: string;
    firstName: string;
    lastName?: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
    role?: string;
    status?: boolean;
    typePerson?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    address?: string;
    profilePicture?: string;
    userId?: string;
    businessId: string;
    data?: any;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CustomersCountResponseDto {
    totalCustomers: number;
    customersRegisteredToday: number;
}
