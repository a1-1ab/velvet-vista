// backend/src/modules/fuzzy-search/fuzzy-search.module.ts

import { Module } from '@nestjs/common';
import { FuzzySearchService } from './fuzzy-search.service';
import { FuzzySearchController } from './fuzzy-search.controller';

/**
 * @module FuzzySearchModule
 * @description NestJS module for the FuzzySearchService.
 * Encapsulates the fuzzy search functionality and exposes it via the FuzzySearchController.
 */
@Module({
  providers: [FuzzySearchService],
  controllers: [FuzzySearchController],
  exports: [FuzzySearchService], // Export the service for use in other modules
})
export class FuzzySearchModule {}
