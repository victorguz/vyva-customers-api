import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export async function validateDto<T extends object>(
  dtoClass: ClassConstructor<T>,
  plain: object,
): Promise<{ instance: T; errors: ValidationError[] }> {
  const instance = plainToInstance(dtoClass, plain, {
    enableImplicitConversion: true,
  });
  const errors = await validate(instance, {
    whitelist: true,
    forbidUnknownValues: false,
  });
  return { instance, errors };
}

/** Primer código de error de negocio a partir de las constraints del DTO. */
export function validationErrorsToCode(
  errors: ValidationError[],
): string | null {
  if (errors.length === 0) {
    return null;
  }

  const first = errors[0];
  if (first.property === "firstName") {
    return "MS020";
  }
  if (first.property === "email") {
    return "MS031";
  }

  const constraint = first.constraints
    ? Object.values(first.constraints)[0]
    : undefined;

  return constraint ?? "MS014";
}
