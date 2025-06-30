
import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import {ProductRepository} from "../../../../repositories/productRepository";

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * Get product details
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get('productId');

    // Kiểm tra xem productId có được cung cấp hay không
    if (!productId) {
      return response({ message: 'Product ID is required' }, STATUS.BAD_REQUEST);
    }

    const repository = new ProductRepository();
    const product = await repository.findById(productId);

    // Kiểm tra xem sản phẩm có tồn tại không
    if (!product) {
      return response({ message: 'Product not found' }, STATUS.NOT_FOUND);
    }

    logger('[Product] details', product.id);

    return response({ product }, STATUS.OK);
  } catch (error) {
    return handleError('Product - Get details', error);
  }
}
