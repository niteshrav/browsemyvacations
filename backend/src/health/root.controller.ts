import { Controller, Get } from "@nestjs/common";

@Controller()
export class RootController {
  @Get()
  getRoot() {
    return {
      service: "bmv-api",
      version: "1",
      health: "/api/v1/health",
      docs: "https://github.com/browsemyvacations/docs",
    };
  }
}
