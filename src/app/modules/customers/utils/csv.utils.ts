import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

export function parseCsvToRecords(content: string): Record<string, string>[] {
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    relax_column_count: true,
    cast: false,
  }) as Record<string, string>[];
}

export function stringifyCsvRecords(
  headers: readonly string[],
  rows: Record<string, string>[],
): string {
  return stringify(rows, {
    header: true,
    columns: [...headers],
    bom: true,
  });
}
