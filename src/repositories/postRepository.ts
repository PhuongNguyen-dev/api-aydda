import type { FilterQuery } from 'mongoose';
import type { IPost } from 'src/models/post.model';

import { Post } from 'src/models/post.model';

export interface IPostInput {
  slug: string;
  publish?: 'published' | 'draft';
  comments?: {
    id: string;
    name: string;
    avatarUrl: string;
    message: string;
    postedAt: string;
    users?: { id: string; name: string; avatarUrl: string }[];
    replyComment?: (
      | { id: string; userId: string; message: string; postedAt: string }
      | { id: string; userId: string; message: string; tagUser: string; postedAt: string }
      )[];
  }[];
  metaKeywords?: string[];
  content: string;
  tags?: string[];
  metaTitle: string;
  title: string;
  coverUrl: string;
  totalViews?: number;
  totalShares?: number;
  totalComments?: number;
  totalFavorites?: number;
  metaDescription: string;
  description: string;
  author: { name: string; avatarUrl: string };
  favoritePerson?: { name: string; avatarUrl: string }[];
  createdAt?: string;
}

export class PostRepository {
  async create(postInput: IPostInput): Promise<IPost> {
    try {
      const post = new Post({
        ...postInput,
        totalViews: postInput.totalViews ?? 0,
        totalShares: postInput.totalShares ?? 0,
        totalComments: postInput.totalComments ?? 0,
        totalFavorites: postInput.totalFavorites ?? 0,
      });
      return await post.save();
    } catch (err: any) {
      throw new Error(`Lỗi khi tạo bài viết: ${err.message}`);
    }
  }

  async findAll(): Promise<IPost[]> {
    try {
      return await Post.find();
    } catch (err: any) {
      throw new Error(`Lỗi khi lấy danh sách bài viết: ${err.message}`);
    }
  }

  async findById(id: string): Promise<IPost | null> {
    try {
      return await Post.findById(id);
    } catch (err: any) {
      throw new Error(`Lỗi khi lấy bài viết theo ID: ${err.message}`);
    }
  }

  async findByQuery(query: FilterQuery<IPost>): Promise<IPost[]> {
    try {
      return await Post.find(query);
    } catch (err: any) {
      throw new Error(`Lỗi khi tìm bài viết: ${err.message}`);
    }
  }

  async update(id: string, postInput: Partial<IPostInput>): Promise<IPost | null> {
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        { ...postInput, updatedAt: new Date() },
        { new: true }
      );
      return post;
    } catch (err: any) {
      throw new Error(`Lỗi khi cập nhật bài viết: ${err.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await Post.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Bài viết không tồn tại');
      }
    } catch (err: any) {
      throw new Error(`Lỗi khi xóa bài viết: ${err.message}`);
    }
  }
}
