import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { ProductRepository } from '../../../../repositories/productRepository';

export const runtime = 'edge';

/** **************************************
 * DELETE - Delete product
 *************************************** */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get('productId');

    if (!productId) {
      return response({ message: 'Product ID is required' }, STATUS.BAD_REQUEST);
    }

    const repository = new ProductRepository();
    await repository.delete(productId);

    logger('[Product] deleted', productId);

    return response({ message: 'Product deleted successfully' }, STATUS.OK);
  } catch (error) {
    return handleError('Product - Delete', error);
  }
}
