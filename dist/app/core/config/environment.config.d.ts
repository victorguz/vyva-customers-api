import { ConfigModuleOptions } from '@nestjs/config';
export declare enum Environment {
    Development = "dev",
    Production = "prd",
    Quality = "qas"
}
export declare const JWT_EXPIRATION: string;
export declare const isProduction: boolean;
export declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    ERROR_LOGS: boolean;
    JWT_SECRET: string;
    SECRET_KEY: string;
    DB_PORT: number;
    ADMIN_PHONE: string;
    ADMIN_EMAIL: string;
    IAM_SMTP: string;
    SMTP_HOST: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    EMAIL_SENDER: string;
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
    REGION: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
}
export declare const configModuleOptions: ConfigModuleOptions;
