import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { User } from "src/app/schemas/user.schema";

import { Customer, CustomerKey } from "../../schemas/customer.schema";
import { IMPORT_CUSTOMER_CSV_HEADERS } from "./dto/import-customer-csv-row.dto";
import { stringifyCsvRecords } from "./utils/csv.utils";

@Injectable()
export class CustomersExportService {
  constructor(
    @InjectModel("Customer")
    private readonly model: Model<Customer, CustomerKey>,
  ) {}

  async exportToCsv(user: User): Promise<string> {
    try {
      if (!user?.idBusiness) {
        throw new Error("MS014");
      }

      const customers = await this.model
        .query("businessId")
        .using("customer-businessid-index")
        .eq(user.idBusiness)
        .exec();

      const headers = [...IMPORT_CUSTOMER_CSV_HEADERS];
      const rows = customers.map((item) => {
        const customer = item.toJSON() as Customer;
        const row: Record<string, string> = {};
        for (const column of headers) {
          row[column] = this.formatCell(customer, column);
        }
        return row;
      });

      return stringifyCsvRecords(headers, rows);
    } catch (error) {
      throw error;
    }
  }

  private formatCell(
    customer: Customer,
    column: (typeof IMPORT_CUSTOMER_CSV_HEADERS)[number],
  ): string {
    if (column === "status") {
      return customer.status === false ? "false" : "true";
    }
    const value = customer[column];
    return value === undefined || value === null ? "" : String(value);
  }
}
