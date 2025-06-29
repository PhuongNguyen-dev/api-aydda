import type { FilterQuery } from 'mongoose';
import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput} from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * GET - Search posts
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('query')?.trim().toLowerCase();

    if (!query) {
      return response({ results: [] }, STATUS.OK);
    }

    const repository = new PostRepository();
    const searchQuery: FilterQuery<IPostInput> = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    };
    const results = await repository.findByQuery(searchQuery);

    logger('[Post] search-results', results.length);

    return response({ results }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get search', error);
  }
}
