import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { adminLoginSchema } from "@bmv/shared";
import { ZodValidationPipe } from "../common/zod-validation.pipe";
import { AuthService } from "./auth.service";

@Controller("admin/auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  @UsePipes(new ZodValidationPipe(adminLoginSchema))
  login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }
}
