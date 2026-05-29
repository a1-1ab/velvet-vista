// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { FuzzySearchModule } from './modules/fuzzy-search/fuzzy-search.module';
import { ProductsModule } from './modules/products/products.module';
import { McpModule } from './modules/mcp/mcp.module';

/**
 * @class AppModule
 * @description Root NestJS module for the Velvet Vista Core API.
 * Imports and configures all feature modules and global dependencies.
 */
@Module({
  imports: [FuzzySearchModule, ProductsModule, McpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
