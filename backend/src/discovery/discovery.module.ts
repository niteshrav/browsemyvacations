import { Module } from "@nestjs/common";
import { AdminSuggestionsController } from "./admin-suggestions.controller";
import { DiscoveryController } from "./discovery.controller";
import { SearchService } from "./search.service";
import { SuggestionsService } from "./suggestions.service";

@Module({
  controllers: [DiscoveryController, AdminSuggestionsController],
  providers: [SearchService, SuggestionsService],
  exports: [SearchService, SuggestionsService],
})
export class DiscoveryModule {}
