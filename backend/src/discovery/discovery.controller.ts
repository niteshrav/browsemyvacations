import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { searchQuerySchema } from "@bmv/shared";
import { SearchService } from "./search.service";
import { SuggestionsService } from "./suggestions.service";

@Controller()
export class DiscoveryController {
  constructor(
    private readonly search: SearchService,
    private readonly suggestions: SuggestionsService,
  ) {}

  @Get("search")
  searchPackages(@Query("q") q?: string): Promise<unknown> {
    const parsed = searchQuerySchema.safeParse({ q: q ?? "" });
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }
    return this.search.search(parsed.data.q);
  }

  @Get("suggestions")
  listSuggestions(): Promise<unknown> {
    return this.suggestions.listPublic();
  }
}
