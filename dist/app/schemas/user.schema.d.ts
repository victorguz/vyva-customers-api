export interface UserKey {
    id: string;
}
export interface User extends UserKey {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
    epaycoCustomerId?: string;
    typePerson?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    city?: string;
    address?: string;
    googleId?: string;
    profilePicture?: string;
    businessInfoId?: string;
    data?: any;
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: import("dynamoose/dist/Schema").Schema;
