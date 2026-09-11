import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export const IMPORT_CUSTOMER_CSV_HEADERS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "documentType",
  "documentNumber",
  "address",
  "city",
  "country",
  "gender",
  "dateOfBirth",
  "typePerson",
  "status",
] as const;

const trimRequired = ({ value }: TransformFnParams) =>
  value === undefined || value === null ? value : String(value).trim();

const trimOptional = ({ value }: TransformFnParams) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  const trimmed = String(value).trim();
  return trimmed === "" ? undefined : trimmed;
};

const defaultTypePerson = ({ value }: TransformFnParams) => {
  if (value === undefined || value === null) {
    return "natural";
  }
  const trimmed = String(value).trim();
  return trimmed === "" ? "natural" : trimmed;
};

const parseStatus = ({ value }: TransformFnParams): boolean | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  const normalized = String(value).trim().toLowerCase();
  if (
    ["true", "1", "si", "sí", "yes", "activo", "active"].includes(normalized)
  ) {
    return true;
  }
  if (["false", "0", "no", "inactivo", "inactive"].includes(normalized)) {
    return false;
  }
  return undefined;
};

export class ImportCustomerCsvRowDto {
  @ApiProperty({ example: "Juan" })
  @Transform(trimRequired)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  documentType?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  documentNumber?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @Transform(trimOptional)
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ required: false, default: "natural" })
  @Transform(defaultTypePerson)
  @IsString()
  @IsOptional()
  typePerson?: string;

  @ApiProperty({ required: false })
  @Transform(parseStatus)
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export function csvImportHasValidHeaders(
  records: Record<string, string>[],
): boolean {
  if (records.length === 0) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(records[0], "firstName");
}

export function isEmptyCsvRecord(record: Record<string, string>): boolean {
  return !Object.values(record).some((value) => String(value ?? "").trim());
}
