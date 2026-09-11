import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { User } from "src/app/schemas/user.schema";

import { GenericResponse } from "../../core/interfaces/generic-response.interface";
import { Customer } from "../../schemas/customer.schema";
import { CurrentUser } from "../../core/auth/decorators/current-user.decorator";
import { AuthGuard } from "../../core/auth/guards/auth.guard";
import { CustomersExportService } from "./customers-export.service";
import { CustomersImportService } from "./customers-import.service";
import { CustomersService } from "./customers.service";
import {
  CustomersImportResultDto,
  ImportCustomersCsvDto,
} from "./dto/customers-csv.dto";
import {
  CreateCustomerDto,
  FindOrCreateForBookingDto,
  UpdateCustomerDto,
} from "./dto/customers.dto";

@ApiTags("Customers")
@Controller("customers")
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customersExportService: CustomersExportService,
    private readonly customersImportService: CustomersImportService,
  ) {}

  @Post("api-key/create")
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: "Create a new customer using API key authentication",
  })
  @ApiResponse({
    status: 201,
    description: "The customer has been successfully created using API key.",
    type: GenericResponse<Customer>,
  })
  async createWithApiKey(
    @Body() createCustomerDto: CreateCustomerDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer>> {
    return this.customersService.create(createCustomerDto, user);
  }

  @Post("find-or-create")
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      "Find or create customer for the current user in a business (booking flow)",
  })
  @ApiResponse({
    status: 200,
    description:
      "Uses the authenticated user (token). Receives only idBusiness. Returns the existing customer or creates one when no customer exists with the same idUser for that business. Updates customer data from current user on each call.",
    type: GenericResponse<Customer>,
  })
  async findOrCreateForBooking(
    @Body() body: FindOrCreateForBookingDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer>> {
    return this.customersService.findOrCreateForBooking(user, body);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create a new customer" })
  @ApiResponse({
    status: 201,
    description: "The customer has been successfully created.",
    type: GenericResponse<Customer>,
  })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer>> {
    return this.customersService.create(createCustomerDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all customers" })
  @ApiResponse({
    status: 200,
    description: "Return all customers.",
    type: GenericResponse<[Customer]>,
  })
  async findAll(
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer[]>> {
    return this.customersService.findAll(user);
  }

  @Get("export/csv")
  @UseGuards(AuthGuard)
  @Header("Content-Type", "text/csv; charset=utf-8")
  @Header("Content-Disposition", 'attachment; filename="clientes.csv"')
  @ApiOperation({ summary: "Export customers as CSV" })
  @ApiResponse({
    status: 200,
    description: "CSV file with all customers of the business.",
  })
  async exportCsv(@CurrentUser() user: User, @Res() res: Response): Promise<void> {
    const csv = await this.customersExportService.exportToCsv(user);
    res.send(csv);
  }

  @Post("import/csv")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Import customers from CSV text in JSON body" })
  @ApiResponse({
    status: 200,
    description: "Import result with created and failed row counts.",
    type: GenericResponse<CustomersImportResultDto>,
  })
  async importCsv(
    @Body() body: ImportCustomersCsvDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<CustomersImportResultDto>> {
    return this.customersImportService.importFromCsv(body.csv, user);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a customer by id" })
  @ApiResponse({
    status: 200,
    description: "Return the customer.",
    type: GenericResponse<Customer>,
  })
  async findOne(
    @Param("id") id: string,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer>> {
    return this.customersService.findOne(id, user);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a customer" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully updated.",
    type: GenericResponse<Customer>,
  })
  async update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<Customer>> {
    return this.customersService.update(id, updateCustomerDto, user);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a customer" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully deleted.",
    type: GenericResponse<void>,
  })
  async remove(
    @Param("id") id: string,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<void>> {
    return this.customersService.remove(id, user);
  }
}
