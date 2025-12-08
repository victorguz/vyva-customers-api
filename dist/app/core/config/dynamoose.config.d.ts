import { ConfigService } from '@nestjs/config';
import { DynamooseModuleOptions } from 'nestjs-dynamoose';
export declare const dynamooseConfig: (configService: ConfigService) => DynamooseModuleOptions;
