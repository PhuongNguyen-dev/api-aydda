import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { ProductRepository } from '../../../../repositories/productRepository';

import type { IProductInput } from '../../../../repositories/productRepository';


export const runtime = 'edge';

/** **************************************
 * POST - Create product
 *************************************** */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productInput: IProductInput = body;

    // Kiểm tra các trường bắt buộc
    if (!productInput.name || !productInput.price || !productInput.category) {
      return response({ message: 'Missing required fields: name, price, or category' }, STATUS.BAD_REQUEST);
    }

    const repository = new ProductRepository();
    const product = await repository.create(productInput);

    logger('[Product] created', product.id);

    return response({ product }, STATUS.OK);
  } catch (error) {
    return handleError('Product - Create', error);
  }
}
