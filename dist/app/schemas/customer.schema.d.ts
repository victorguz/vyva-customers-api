export interface CustomerKey {
    id: string;
}
export interface Customer extends CustomerKey {
    firstName: string;
    lastName?: string;
    email?: string;
    role?: string;
    status?: boolean;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
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
export declare const CustomerSchema: import("dynamoose/dist/Schema").Schema;
