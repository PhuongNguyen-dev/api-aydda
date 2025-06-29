import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

// ----------------------------------------------------------------------

export const runtime = 'edge';

/** **************************************
 * GET - Posts
 *************************************** */
export async function GET() {
  try {
    const reposytory = new PostRepository();

    const posts = await reposytory.findAll()


    logger('[Post] list', posts.length);

    return response({ posts }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get list', error);
  }
}
