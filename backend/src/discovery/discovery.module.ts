import { Module } from "@nestjs/common";
import { MediaModule } from "../media/media.module";
import { AdminSuggestionsController } from "./admin-suggestions.controller";
import { DiscoveryController } from "./discovery.controller";
import { SearchService } from "./search.service";
import { SuggestionsService } from "./suggestions.service";

@Module({
  imports: [MediaModule],
  controllers: [DiscoveryController, AdminSuggestionsController],
  providers: [SearchService, SuggestionsService],
  exports: [SearchService, SuggestionsService],
})
export class DiscoveryModule {}
