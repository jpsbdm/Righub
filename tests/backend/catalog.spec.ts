import { addCatalogProduct, approveProduct, getProduct } from '../../src/backend/catalog';

describe('Catalog Module', () => {
  const userId = 'uid123';

  it('should allow user to submit a product', async () => {
    const productData = { name: 'SmartSolar MPPT', brand: 'Victron', category: 'Solar Controllers', specs: { current: 100 } };
    const product = await addCatalogProduct(userId, productData);
    expect(product.status).toBe('pending');
    expect(product.name).toBe('SmartSolar MPPT');
  });

  it('should allow moderator to approve a product', async () => {
    await expect(approveProduct(userId, 'pid123')).resolves.not.toThrow();
  });

  it('should fetch a product', async () => {
    const product = await getProduct('pid123');
    expect(product?.name).toBe('MultiPlus-II');
  });
});
