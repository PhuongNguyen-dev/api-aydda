import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { ProductRepository } from '../../../../repositories/productRepository';

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * GET - Search products
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('query')?.trim().toLowerCase();

    if (!query) {
      return response({ results: [] }, STATUS.OK);
    }

    const repository = new ProductRepository();
    const results = await repository.findByQuery({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Tìm kiếm không phân biệt hoa thường
        { sku: { $regex: query, $options: 'i' } },
      ],
    });

    logger('[Product] search-results', results.length);

    return response({ results }, STATUS.OK);
  } catch (error) {
    return handleError('Product - Get search', error);
  }
}
