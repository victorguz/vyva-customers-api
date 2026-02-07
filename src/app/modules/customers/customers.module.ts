import { Module } from '@nestjs/common';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRATION } from 'src/app/core/config/environment.config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from 'src/app/schemas/user.schema';
import { CustomerSchema } from 'src/app/schemas/customer.schema';
import { ApiKeyGuard } from '../auth/guards/apikey.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_EXPIRATION,
        },
      }),
      inject: [ConfigService],
    }),
    DynamooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        options: {
          tableName: 'users',
          throughput: 'ON_DEMAND',
        },
      },
      {
        name: 'Customer',
        schema: CustomerSchema,
        options: {
          tableName: 'customers',
          throughput: 'ON_DEMAND',
        },
        serializers: {
          frontend: {
            include: ['id', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'data'],
          },
        },
      },
    ]),],
  controllers: [CustomersController],
  providers: [AuthGuard, ApiKeyGuard, JwtModule, DynamooseModule, CustomersService],
  exports: [CustomersService],
})
export class CustomersModule { }
