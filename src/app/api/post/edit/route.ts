import type { FilterQuery } from 'mongoose';
import type { NextRequest } from 'next/server';

import { kebabCase } from 'es-toolkit';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput } from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * PUT - Update post
 *************************************** */
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get('postId');

    if (!postId) {
      return response({ message: 'Post ID is required' }, STATUS.BAD_REQUEST);
    }

    const body = await req.json();
    const postInput: Partial<IPostInput> = body;

    // Kiểm tra các trường bắt buộc
    if (
      !postInput.title ||
      !postInput.content ||
      !postInput.metaTitle ||
      !postInput.metaDescription ||
      !postInput.description ||
      !postInput.coverUrl ||
      !postInput.author
    ) {
      return response(
        { message: 'Missing required fields: title, content, metaTitle, metaDescription, description, coverUrl, or author' },
        STATUS.BAD_REQUEST
      );
    }

    // Tạo slug từ title nếu có
    if (postInput.title) {
      postInput.slug = kebabCase(postInput.title);
    }

    const repository = new PostRepository();
    const query: FilterQuery<IPostInput> = { _id: postId };
    const existingPost = await repository.findByQuery(query);

    if (!existingPost[0]) {
      return response({ message: 'Post not found' }, STATUS.NOT_FOUND);
    }

    const post = await repository.update(postId, postInput);

    logger('[Post] updated', postId);

    return response({ post }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Update', error);
  }
}
