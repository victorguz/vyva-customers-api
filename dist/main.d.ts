import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
export declare function createApp(expressApp: Express): Promise<INestApplication>;
