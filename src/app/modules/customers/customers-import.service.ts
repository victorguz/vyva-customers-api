import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import * as moment from "moment";
import { InjectModel, Model } from "nestjs-dynamoose";
import { User } from "src/app/schemas/user.schema";
import { v4 as uuidv4 } from "uuid";

import { GenericResponse } from "../../core/interfaces/generic-response.interface";
import { deleteEmptyProperties } from "../../shared/shared.functions";
import {
  validateDto,
  validationErrorsToCode,
} from "../../shared/validate-dto.functions";
import { CustomersImportResultDto } from "./dto/customers-csv.dto";
import { CreateCustomerDto } from "./dto/customers.dto";
import {
  csvImportHasValidHeaders,
  ImportCustomerCsvRowDto,
  isEmptyCsvRecord,
} from "./dto/import-customer-csv-row.dto";
import { parseCsvToRecords } from "./utils/csv.utils";
import { Customer, CustomerKey } from "../../schemas/customer.schema";

@Injectable()
export class CustomersImportService {
  constructor(
    @InjectModel("Customer")
    private readonly model: Model<Customer, CustomerKey>,
  ) {}

  async importFromCsv(
    fileContent: string,
    user: User,
  ): Promise<GenericResponse<CustomersImportResultDto>> {
    try {
      if (!user?.idBusiness) {
        throw new Error("MS014");
      }

      const content = (fileContent ?? "").trim();
      if (!content) {
        throw new Error("MS041");
      }

      const records = parseCsvToRecords(content);
      if (!csvImportHasValidHeaders(records)) {
        throw new Error("MS041");
      }

      const result: CustomersImportResultDto = {
        totalRows: 0,
        created: 0,
        failed: 0,
        errors: [],
      };

      const pending: Array<{
        rowNumber: number;
        item: Customer;
      }> = [];

      for (let index = 0; index < records.length; index++) {
        const rowNumber = index + 2;
        const record = records[index];

        if (isEmptyCsvRecord(record)) {
          continue;
        }

        result.totalRows++;

        try {
          const { instance, errors } = await validateDto(
            ImportCustomerCsvRowDto,
            record,
          );
          const validationCode = validationErrorsToCode(errors);
          if (validationCode) {
            throw new Error(validationCode);
          }

          const createDto = plainToInstance(CreateCustomerDto, instance);
          pending.push({
            rowNumber,
            item: this.toCustomerItem(createDto, user),
          });
        } catch (error) {
          result.failed++;
          result.errors.push({
            row: rowNumber,
            message: this.resolveRowError(error),
          });
        }
      }

      // DynamoDB batch write limit: 25 items per request.
      const chunks = chunk(pending, 25);
      for (const chunkItems of chunks) {
        try {
          await this.model.batchPut(chunkItems.map((x) => x.item));
          result.created += chunkItems.length;
        } catch (error) {
          // Fallback to per-item create to keep row-level errors.
          for (const { rowNumber, item } of chunkItems) {
            try {
              await this.model.create(item);
              result.created++;
            } catch (itemError) {
              result.failed++;
              result.errors.push({
                row: rowNumber,
                message: this.resolveRowError(itemError),
              });
            }
          }
        }
      }

      return new GenericResponse(result);
    } catch (error) {
      throw error;
    }
  }

  private toCustomerItem(dto: CreateCustomerDto, user: User): Customer {
    const now = moment().toISOString();
    return deleteEmptyProperties({
      id: uuidv4(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email ? dto.email.toLowerCase() : undefined,
      role: dto.role || "customer",
      status: dto.status !== undefined ? dto.status : true,
      documentType: dto.documentType,
      documentNumber: dto.documentNumber,
      phone: dto.phone,
      typePerson: dto.typePerson || "natural",
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      country: dto.country,
      city: dto.city,
      address: dto.address,
      profilePicture: dto.profilePicture,
      idUser: dto.idUser,
      businessId: user.idBusiness,
      createdAt: now,
      updatedAt: now,
      data: dto.data,
    }) as Customer;
  }

  private resolveRowError(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return "MS027";
  }
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}
