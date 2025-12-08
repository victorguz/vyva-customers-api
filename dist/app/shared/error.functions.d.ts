import { HttpException, HttpStatus } from '@nestjs/common';
export declare function handleError(error: any, httpStatus?: HttpStatus): HttpException;
export declare function findHandledError(error: string, httpStatus: HttpStatus): HttpException;
export declare function findHandledErrorMessage(error: string): string;
