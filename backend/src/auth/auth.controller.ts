import { Body, Controller, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { adminChangePasswordSchema, adminLoginSchema } from "@bmv/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import type { JwtPayload } from "./jwt.strategy";

@Controller("admin/auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  @UsePipes(new ZodValidationPipe(adminLoginSchema))
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(adminChangePasswordSchema))
  changePassword(
    @Req() req: { user: JwtPayload },
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.auth.changePassword(req.user.sub, body.currentPassword, body.newPassword);
  }
}
