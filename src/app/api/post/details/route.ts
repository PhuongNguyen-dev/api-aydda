import type { FilterQuery } from 'mongoose';
import type { NextRequest } from 'next/server';

import { kebabCase } from 'es-toolkit';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput } from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * GET - Post details
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get('title');

    if (!title) {
      return response({ message: 'Title is required' }, STATUS.BAD_REQUEST);
    }

    const repository = new PostRepository();
    const query: FilterQuery<IPostInput> = {
      slug: kebabCase(title), // Tìm theo slug (kebab-case của title)
    };
    const posts = await repository.findByQuery(query);

    const post = posts[0]; // Lấy bài viết đầu tiên khớp

    if (!post) {
      return response({ message: 'Post not found' }, STATUS.NOT_FOUND);
    }

    logger('[Post] details', post.id);

    return response({ post }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get details', error);
  }
}
