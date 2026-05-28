import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ImportCustomersCsvDto {
  @ApiProperty({
    description: "CSV file contents (header row + data rows)",
  })
  @IsString()
  @IsNotEmpty()
  csv: string;
}

export class CustomerImportRowErrorDto {
  @ApiProperty({ example: 2 })
  row: number;

  @ApiProperty({ example: "firstName is required" })
  message: string;
}

export class CustomersImportResultDto {
  @ApiProperty({ example: 10 })
  totalRows: number;

  @ApiProperty({ example: 8 })
  created: number;

  @ApiProperty({ example: 2 })
  failed: number;

  @ApiProperty({ type: [CustomerImportRowErrorDto] })
  errors: CustomerImportRowErrorDto[];
}
