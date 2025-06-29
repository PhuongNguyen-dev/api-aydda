import type { FilterQuery } from 'mongoose';
import type { NextRequest } from 'next/server';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput } from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * DELETE - Delete post
 *************************************** */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get('postId');

    if (!postId) {
      return response({ message: 'Post ID is required' }, STATUS.BAD_REQUEST);
    }

    const repository = new PostRepository();
    const query: FilterQuery<IPostInput> = { _id: postId };
    const existingPost = await repository.findByQuery(query);

    if (!existingPost[0]) {
      return response({ message: 'Post not found' }, STATUS.NOT_FOUND);
    }

    await repository.delete(postId);

    logger('[Post] deleted', postId);

    return response({ message: 'Post deleted successfully' }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Delete', error);
  }
}
