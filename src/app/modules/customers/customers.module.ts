import { Module } from "@nestjs/common";

import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRATION } from "src/app/core/config/environment.config";
import { DynamooseModule } from "nestjs-dynamoose";
import { UserSchema } from "src/app/schemas/user.schema";
import { CustomerSchema } from "src/app/schemas/customer.schema";
import { BusinessSchema } from "src/app/schemas/business.schema";
import { AppointmentSchema } from "src/app/schemas/appointment.schema";
import { AuthGuard } from "../../core/auth/guards/auth.guard";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: JWT_EXPIRATION,
        },
      }),
      inject: [ConfigService],
    }),
    DynamooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema,
        options: {
          tableName: "users",
          throughput: "ON_DEMAND",
        },
      },
      {
        name: "Customer",
        schema: CustomerSchema,
        options: {
          tableName: "customers",
          throughput: "ON_DEMAND",
        },
        serializers: {
          frontend: {
            include: [
              "id",
              "firstName",
              "lastName",
              "email",
              "phone",
              "status",
              "createdAt",
              "data",
            ],
          },
        },
      },
      {
        name: "Business",
        schema: BusinessSchema,
        options: {
          tableName: "businesses",
          throughput: "ON_DEMAND",
          create: false,
        },
      },
      {
        name: "Appointment",
        schema: AppointmentSchema,
        options: {
          tableName: "appointments",
          throughput: "ON_DEMAND",
          create: false,
        },
      },
    ]),
  ],
  controllers: [CustomersController, DashboardController],
  providers: [
    AuthGuard,
    JwtModule,
    DynamooseModule,
    CustomersService,
    DashboardService,
  ],
  exports: [CustomersService, DashboardService],
})
export class CustomersModule {}
