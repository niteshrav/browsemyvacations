import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { createSuggestionSchema, updateSuggestionSchema } from "@bmv/shared";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { SuggestionsService } from "./suggestions.service";

@Controller("admin/suggestions")
@UseGuards(JwtAuthGuard)
export class AdminSuggestionsController {
  constructor(private readonly suggestions: SuggestionsService) {}

  @Get()
  list(): Promise<unknown> {
    return this.suggestions.listAdmin();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createSuggestionSchema))
  create(@Body() body: ReturnType<typeof createSuggestionSchema.parse>): Promise<unknown> {
    return this.suggestions.create(body);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateSuggestionSchema))
    body: ReturnType<typeof updateSuggestionSchema.parse>,
  ): Promise<unknown> {
    return this.suggestions.update(id, body);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<{ ok: true }> {
    await this.suggestions.remove(id);
    return { ok: true };
  }
}
