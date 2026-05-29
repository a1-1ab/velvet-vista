// backend/src/modules/fuzzy-search/fuzzy-search.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { FuzzySearchService } from './fuzzy-search.service';

/**
 * @class FuzzySearchController
 * @description REST API controller for fuzzy search operations.
 * Exposes endpoints to search products using fuzzy matching.
 */
@Controller('search')
export class FuzzySearchController {
  constructor(private readonly fuzzySearchService: FuzzySearchService) {}

  /**
   * @method search
   * @description Endpoint to search products using a fuzzy query.
   * @param {string} query The user's search query.
   * @returns {Array<{ product: object; score: number; matchedAttribute: string }>}
   * Array of matching products with their similarity scores and matched attributes.
   */
  @Get()
  public search(
    @Query('q') query: string,
    @Query('threshold') threshold?: number
  ): Array<{ product: object; score: number; matchedAttribute: string }> {
    // Set the threshold if provided
    if (threshold !== undefined && threshold >= 0 && threshold <= 1) {
      this.fuzzySearchService.setMinimumMatchThreshold(threshold);
    }

    // In a real implementation, you would fetch products from the database here.
    // For now, we'll use a mock array of products for demonstration.
    const mockProducts = [
      { id: '1', name: 'Rolex Submariner', brand: 'Rolex', model: 'Submariner', description: 'Iconic dive watch' },
      { id: '2', name: 'Rolex Daytona', brand: 'Rolex', model: 'Daytona', description: 'Legendary chronograph' },
      { id: '3', name: 'Patek Philippe Nautilus', brand: 'Patek Philippe', model: 'Nautilus', description: 'Luxury watch with porthole design' },
      { id: '4', name: 'Omega Speedmaster', brand: 'Omega', model: 'Speedmaster', description: 'First watch on the Moon' },
      { id: '5', name: 'Audemars Piguet Royal Oak', brand: 'Audemars Piguet', model: 'Royal Oak', description: 'Revolutionary luxury sports watch' },
    ];

    return this.fuzzySearchService.searchProducts(query, mockProducts);
  }

  /**
   * @method checkMatch
   * @description Endpoint to check if a specific attribute matches a query.
   * @param {string} query The user's search query.
   * @param {string} attribute The attribute to check against the query.
   * @returns {boolean} True if the attribute matches the query.
   */
  @Get('check')
  public checkMatch(
    @Query('q') query: string,
    @Query('attr') attribute: string
  ): { matches: boolean; score: number } {
    const score = this.fuzzySearchService.getSimilarityScore(query, attribute);
    const matches = this.fuzzySearchService.evaluateProductMatch(query, attribute);
    return { matches, score };
  }

  /**
   * @method getThreshold
   * @description Endpoint to get the current minimum match threshold.
   * @returns {number} The current minimum match threshold.
   */
  @Get('threshold')
  public getThreshold(): { threshold: number } {
    return { threshold: this.fuzzySearchService.getMinimumMatchThreshold() };
  }
}
