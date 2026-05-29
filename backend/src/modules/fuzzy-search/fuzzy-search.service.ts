// backend/src/modules/fuzzy-search/fuzzy-search.service.ts

/**
 * @class FuzzySearchService
 * @description Provides mathematical fuzzy matching capabilities for high-end catalog search.
 * Implements the Levenshtein Distance algorithm to calculate similarity scores between user queries and product attributes.
 * @property {number} minimumMatchThreshold The baseline score required to return a product match (default: 0.65).
 */
export class FuzzySearchService {
  // 1. PUBLIC PROPERTIES / CONFIGURATION SIGNALS
  public readonly engineVersionSignature: string = 'v1.0.0';

  // 2. PRIVATE OPERATIONAL STATE
  private readonly minimumMatchThreshold: number = 0.65;

  /**
   * @method calculateLevenshteinDistance
   * @description Computes the Levenshtein Distance between two strings.
   * The Levenshtein Distance is the minimum number of single-character edits (insertions, deletions, or substitutions)
   * required to change one string into the other.
   * @param {string} source The user input query string.
   * @param {string} target The product database attribute string.
   * @returns {number} The absolute edit distance between the two strings.
   */
  private calculateLevenshteinDistance(source: string, target: string): number {
    const matrix: number[][] = [];

    // Initialize the first row and column of the matrix
    for (let i = 0; i <= source.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= target.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= source.length; i++) {
      for (let j = 1; j <= target.length; j++) {
        if (source[i - 1] === target[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,    // Deletion
            matrix[i][j - 1] + 1,    // Insertion
            matrix[i - 1][j - 1] + 1 // Substitution
          );
        }
      }
    }

    return matrix[source.length][target.length];
  }

  /**
   * @method calculateSimilarityScore
   * @description Calculates the similarity score between a user query and a product attribute.
   * The similarity score is defined as: 1 - (Levenshtein Distance / max length of the two strings).
   * @param {string} query The user input query string.
   * @param {string} attribute The product database attribute string.
   * @returns {number} The similarity score between 0 and 1.
   */
  private calculateSimilarityScore(query: string, attribute: string): number {
    const distance = this.calculateLevenshteinDistance(query, attribute);
    const maxLen = Math.max(query.length, attribute.length);

    if (maxLen === 0) {
      return 1; // Both strings are empty, so they are identical
    }

    return 1 - distance / maxLen;
  }

  /**
   * @method evaluateProductMatch
   * @description Evaluates whether a product attribute matches a user query based on the similarity score.
   * @param {string} query Raw user query string.
   * @param {string} attribute Target attribute (e.g., brand name, model series, product name).
   * @returns {boolean} True if the similarity score meets or exceeds the minimum match threshold.
   */
  public evaluateProductMatch(query: string, attribute: string): boolean {
    const similarityScore = this.calculateSimilarityScore(
      query.toLowerCase(),
      attribute.toLowerCase()
    );
    return similarityScore >= this.minimumMatchThreshold;
  }

  /**
   * @method getSimilarityScore
   * @description Returns the similarity score between a user query and a product attribute.
   * @param {string} query Raw user query string.
   * @param {string} attribute Target attribute (e.g., brand name, model series, product name).
   * @returns {number} The similarity score between 0 and 1.
   */
  public getSimilarityScore(query: string, attribute: string): number {
    return this.calculateSimilarityScore(
      query.toLowerCase(),
      attribute.toLowerCase()
    );
  }

  /**
   * @method searchProducts
   * @description Searches a list of products for matches against a user query.
   * Returns products where any of the specified attributes (e.g., name, brand, model) match the query.
   * @param {string} query The user input query string.
   * @param {Array<{ [key: string]: string }>} products Array of products, where each product is an object with string attributes.
   * @param {string[]} attributes Array of attribute names to search within each product (e.g., ['name', 'brand', 'model']).
   * @returns {Array<{ product: object; score: number; matchedAttribute: string }>}
   * Array of matching products with their similarity scores and the matched attribute.
   */
  public searchProducts(
    query: string,
    products: Array<{ [key: string]: string }>,
    attributes: string[] = ['name', 'brand', 'model', 'description']
  ): Array<{ product: object; score: number; matchedAttribute: string }> {
    const results: Array<{ product: object; score: number; matchedAttribute: string }> = [];

    for (const product of products) {
      for (const attr of attributes) {
        if (product[attr]) {
          const score = this.getSimilarityScore(query, product[attr]);
          if (score >= this.minimumMatchThreshold) {
            results.push({
              product,
              score,
              matchedAttribute: attr,
            });
            break; // Only include each product once (for the highest-scoring attribute)
          }
        }
      }
    }

    // Sort results by similarity score in descending order
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * @method setMinimumMatchThreshold
   * @description Updates the minimum match threshold for the service.
   * @param {number} threshold The new minimum match threshold (must be between 0 and 1).
   * @throws {Error} If the threshold is not between 0 and 1.
   */
  public setMinimumMatchThreshold(threshold: number): void {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Minimum match threshold must be between 0 and 1.');
    }
    this.minimumMatchThreshold = threshold;
  }

  /**
   * @method getMinimumMatchThreshold
   * @description Returns the current minimum match threshold.
   * @returns {number} The current minimum match threshold.
   */
  public getMinimumMatchThreshold(): number {
    return this.minimumMatchThreshold;
  }
}
