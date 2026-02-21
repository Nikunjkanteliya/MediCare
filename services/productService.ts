import { products } from '@/data/products';
import { Product, ProductCategory } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
    /**
     * Get all products with optional category filter
     */
    async getProducts(category?: string): Promise<Product[]> {
        await delay(300);
        if (!category || category === 'All') return products;
        return products.filter((p) => p.category === category);
    },

    /**
     * Get a single product by ID
     */
    async getProductById(id: string): Promise<Product | null> {
        await delay(200);
        return products.find((p) => p.id === id) || null;
    },

    /**
     * Get featured products
     */
    async getFeaturedProducts(): Promise<Product[]> {
        await delay(200);
        return products.filter((p) => p.badge === 'bestseller').slice(0, 6);
    },

    /**
     * Get related products by category, excluding the current product
     */
    async getRelatedProducts(
        productId: string,
        category: ProductCategory,
        limit = 4
    ): Promise<Product[]> {
        await delay(200);
        return products
            .filter((p) => p.category === category && p.id !== productId)
            .slice(0, limit);
    },

    /**
     * Search products by name or description
     */
    async searchProducts(query: string): Promise<Product[]> {
        await delay(300);
        const lowerQuery = query.toLowerCase();
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.brand.toLowerCase().includes(lowerQuery) ||
                p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
    },
};
