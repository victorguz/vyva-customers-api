import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsOptional } from "class-validator";

import { Customer } from "../../../schemas/customer.schema";

export class DashboardQueryDto {
  @ApiPropertyOptional({ description: "Start date (ISO string)" })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: "End date (ISO string)" })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: "Include associated customer list in response",
    default: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  includeCustomers?: boolean = false;
}

export class DashboardMetricDto {
  @ApiProperty({ description: "Numeric value for the metric" })
  value: number;

  @ApiPropertyOptional({ description: "Optional percentage value (0-100)" })
  percentage?: number;

  @ApiPropertyOptional({
    description: "Optional customer count for the metric",
  })
  count?: number;

  @ApiProperty({
    description: "Value type to render in frontend",
    enum: ["number", "percentage", "currency", "days"],
  })
  valueType: "number" | "percentage" | "currency" | "days";

  @ApiPropertyOptional({
    description: "Associated customers (if includeCustomers=true)",
  })
  customers?: Partial<Customer>[];
}

export class DashboardSummaryResponseDto {
  @ApiProperty({ description: "Timestamp when dashboard was generated" })
  generatedAt: string;

  @ApiPropertyOptional({
    description: "Effective start date used for filtering",
  })
  startDate?: string;

  @ApiPropertyOptional({ description: "Effective end date used for filtering" })
  endDate?: string;

  @ApiProperty({
    description:
      "Customer statistics (nuevos, en riesgo, renuentes, retenidos)",
    type: "array",
    items: { $ref: "#/components/schemas/DashboardMetricDto" },
  })
  customerDashboard: (DashboardMetricDto & { key: string })[];

  @ApiProperty({
    description: "Main KPIs (4)",
    type: "array",
    items: { $ref: "#/components/schemas/DashboardMetricDto" },
  })
  mainKpis: (DashboardMetricDto & { key: string })[];

  @ApiProperty({
    description: "Secondary metrics (10)",
    type: "array",
    items: { $ref: "#/components/schemas/DashboardMetricDto" },
  })
  secondary: (DashboardMetricDto & { key: string })[];
}
