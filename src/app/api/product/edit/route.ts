import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { ProductRepository } from '../../../../repositories/productRepository';

import type { IProductInput } from '../../../../repositories/productRepository';

export const runtime = 'edge';

/** **************************************
 * PUT - Update product
 *************************************** */
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get('productId');

    if (!productId) {
      return response({ message: 'Product ID is required' }, STATUS.BAD_REQUEST);
    }

    const body = await req.json();
    const productInput: Partial<IProductInput> = body;

    const repository = new ProductRepository();
    const product = await repository.update(productId, productInput);

    if (!product) {
      return response({ message: 'Product not found' }, STATUS.NOT_FOUND);
    }

    logger('[Product] updated', product.id);

    return response({ product }, STATUS.OK);
  } catch (error) {
    return handleError('Product - Update', error);
  }
}
