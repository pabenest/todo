import { type ArgumentMetadata, BadRequestException, type PipeTransform } from "@nestjs/common";
import { type ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  public transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch {
      throw new BadRequestException("Validation failed");
    }
    return value;
  }
}
