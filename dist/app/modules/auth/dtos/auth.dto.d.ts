export declare class AuthRequestDto {
    email: string;
    password: string;
    idCompany: number;
}
export declare class RefreshTokenRequest {
    email: string;
    password: string;
    idCompany: number;
}
export declare class AuthUser {
    sub: string;
    email: string;
    role: string;
    idCompany?: number;
    agencyId?: number;
}
export declare class GoogleSignInDto {
    token: string;
}
export declare class AuthCreateUserDto {
    name: string;
    email: string;
    password: string;
}
export declare class AuthLoginDto {
    email: string;
    password: string;
}
export declare class AuthUpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    documentType?: string;
    documentNumber?: string;
    phone?: string;
}
