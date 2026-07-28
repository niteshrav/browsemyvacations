import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { createSuggestionSchema, updateSuggestionSchema } from "@bmv/shared";
import { memoryStorage } from "multer";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { MediaService } from "./media.service";
import { SuggestionsService } from "./suggestions.service";

@Controller("admin/suggestions")
@UseGuards(JwtAuthGuard)
export class AdminSuggestionsController {
  constructor(
    private readonly suggestions: SuggestionsService,
    private readonly media: MediaService,
  ) {}

  @Get()
  list(): Promise<unknown> {
    return this.suggestions.listAdmin();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createSuggestionSchema))
  create(@Body() body: ReturnType<typeof createSuggestionSchema.parse>): Promise<unknown> {
    return this.suggestions.create(body);
  }

  @Post("images")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    const url = await this.media.uploadPackageImage(file);
    return { url };
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
