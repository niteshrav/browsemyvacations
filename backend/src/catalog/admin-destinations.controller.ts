import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { createDestinationSchema, updateDestinationSchema } from "@bmv/shared";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { DestinationsService } from "./destinations.service";

@Controller("admin/destinations")
@UseGuards(JwtAuthGuard)
export class AdminDestinationsController {
  constructor(private readonly destinations: DestinationsService) {}

  @Get()
  list(): Promise<unknown> {
    return this.destinations.listAdmin();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createDestinationSchema))
  create(@Body() body: ReturnType<typeof createDestinationSchema.parse>): Promise<unknown> {
    return this.destinations.create(body);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateDestinationSchema))
    body: ReturnType<typeof updateDestinationSchema.parse>,
  ): Promise<unknown> {
    return this.destinations.update(id, body);
  }
}
