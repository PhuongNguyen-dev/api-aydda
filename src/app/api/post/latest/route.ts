import type { FilterQuery } from 'mongoose';
import type { NextRequest } from 'next/server';

import { kebabCase } from 'es-toolkit';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput } from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * GET - Latest posts
 *************************************** */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get('title');

    const repository = new PostRepository();
    const query: FilterQuery<IPostInput> = title
      ? { slug: { $ne: kebabCase(title) }, publish: 'published' } // Loại bỏ bài viết có slug khớp và chỉ lấy bài viết đã publish
      : { publish: 'published' }; // Lấy tất cả bài viết đã publish

    const latestPosts = await repository.findByQuery(query);

    logger('[Post] latest-list', latestPosts.length);

    return response({ latestPosts }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Get latest', error);
  }
}
