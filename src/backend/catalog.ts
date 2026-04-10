// catalog.ts – Accessory Catalog features
import { logAuditAction } from './auth';

export interface CatalogProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  specs: Record<string, string | number>;
  status: 'pending' | 'approved' | 'rejected';
}

export async function addCatalogProduct(userId: string, product: Omit<CatalogProduct, 'id' | 'status'>): Promise<CatalogProduct> {
  console.log(`User ${userId} submitted product: ${product.name}`);
  const newProduct: CatalogProduct = {
    ...product,
    id: 'pid' + Math.random().toString(36).substr(2, 9),
    status: 'pending'
  };
  await logAuditAction(userId, 'SUBMIT_CATALOG_PRODUCT', { productId: newProduct.id });
  return newProduct;
}

export async function approveProduct(userId: string, productId: string): Promise<void> {
  console.log(`Moderator ${userId} approved product: ${productId}`);
  await logAuditAction(userId, 'APPROVE_CATALOG_PRODUCT', { productId });
}

export async function getProduct(productId: string): Promise<CatalogProduct | null> {
  // Mock product fetch
  return {
    id: productId,
    name: 'MultiPlus-II',
    brand: 'Victron Energy',
    category: 'Inverters',
    specs: { voltage: 12, power: 3000 },
    status: 'approved'
  };
}
