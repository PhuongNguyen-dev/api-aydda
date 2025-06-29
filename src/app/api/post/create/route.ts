import type { NextRequest } from 'next/server';

import { kebabCase } from 'es-toolkit';

import { logger } from 'src/utils/logger';
import { STATUS, response, handleError } from 'src/utils/response';

import { PostRepository } from '../../../../repositories/postRepository';

import type { IPostInput } from '../../../../repositories/postRepository';

export const runtime = 'edge';

/** **************************************
 * POST - Create post
 *************************************** */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const postInput: IPostInput = body;

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

    // Tạo slug từ title
    postInput.slug = kebabCase(postInput.title);

    // Thiết lập các giá trị mặc định
    postInput.publish = postInput.publish || 'draft';
    postInput.metaKeywords = postInput.metaKeywords || [];
    postInput.tags = postInput.tags || [];
    postInput.totalViews = postInput.totalViews || 0;
    postInput.totalShares = postInput.totalShares || 0;
    postInput.totalComments = postInput.totalComments || 0;
    postInput.totalFavorites = postInput.totalFavorites || 0;
    postInput.favoritePerson = postInput.favoritePerson || [];
    postInput.comments = postInput.comments || [];
    postInput.createdAt = postInput.createdAt || new Date().toISOString();

    const repository = new PostRepository();
    const post = await repository.create(postInput);

    logger('[Post] created', post.id.toString());

    return response({ post }, STATUS.OK);
  } catch (error) {
    return handleError('Post - Create', error);
  }
}
