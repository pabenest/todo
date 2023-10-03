import { type ArgumentMetadata, BadRequestException, type PipeTransform } from "@nestjs/common";
import { type ZodObject } from "zod";

import { type Any } from "../types";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<Any>) {}

  public transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch {
      throw new BadRequestException("Validation failed");
    }
    return value;
  }
}
