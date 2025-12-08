import { HttpStatus } from '@nestjs/common';
export interface IGenericResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
export declare class GenericResponse<T> implements IGenericResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    handledError?: boolean;
    code?: string;
    status?: HttpStatus;
    constructor(data: T, success?: boolean, message?: string, handledError?: boolean, code?: string, status?: HttpStatus);
}
