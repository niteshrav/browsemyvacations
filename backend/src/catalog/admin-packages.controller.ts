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
import { createPackageSchema, updatePackageSchema } from "@bmv/shared";
import { memoryStorage } from "multer";
import { z } from "zod";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { MediaService } from "../discovery/media.service";
import { PackagesService } from "./packages.service";

const removeImageSchema = z.object({
  url: z.string().url(),
});

@Controller("admin/packages")
@UseGuards(JwtAuthGuard)
export class AdminPackagesController {
  constructor(
    private readonly packages: PackagesService,
    private readonly media: MediaService,
  ) {}

  @Get()
  list(): Promise<unknown> {
    return this.packages.listAdmin();
  }

  @Get("stats")
  stats(): Promise<unknown> {
    return this.packages.adminStats();
  }

  @Get(":id")
  get(@Param("id") id: string): Promise<unknown> {
    return this.packages.findByIdOrThrow(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createPackageSchema))
  create(@Body() body: ReturnType<typeof createPackageSchema.parse>): Promise<unknown> {
    return this.packages.create(body);
  }

  @Post(":id/duplicate")
  @HttpCode(HttpStatus.CREATED)
  duplicate(@Param("id") id: string): Promise<unknown> {
    return this.packages.duplicate(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updatePackageSchema))
    body: ReturnType<typeof updatePackageSchema.parse>,
  ): Promise<unknown> {
    return this.packages.update(id, body);
  }

  @Post(":id/images")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadImage(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<unknown> {
    const url = await this.media.uploadPackageImage(file);
    return this.packages.addImage(id, url);
  }

  @Delete(":id/images")
  removeImage(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(removeImageSchema)) body: { url: string },
  ): Promise<unknown> {
    return this.packages.removeImage(id, body.url);
  }
}
