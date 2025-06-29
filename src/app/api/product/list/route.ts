import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { _products } from 'src/_mock/_product';
import { ProductRepository } from '../../../../repositories/productRepository';

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * GET - Products
 *************************************** */
export async function GET() {
  try {
    // const products = _products();
    //
    // logger('[Product] list', products.length);
    //
    // return response({ products }, STATUS.OK);


    const reposytory = new ProductRepository();

    const products = await reposytory.findByQuery()

    return response({ products }, STATUS.OK);



  } catch (error) {
    return handleError('Product - Get list', error);
  }
}


