import { BadRequestException, PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(e.flatten());
      }
      throw e;
    }
  }
}
