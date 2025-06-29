import type { Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

// Interface cho Post
export interface IPost extends Document {
  id: string;
  publish: 'published' | 'draft';
  comments: {
    id: string;
    name: string;
    avatarUrl: string;
    message: string;
    postedAt: string;
    users: { id: string; name: string; avatarUrl: string }[];
    replyComment: (
      | { id: string; userId: string; message: string; postedAt: string }
      | { id: string; userId: string; message: string; tagUser: string; postedAt: string }
      )[];
  }[];
  metaKeywords: string[];
  content: string;
  tags: string[];
  metaTitle: string;
  createdAt: string;
  title: string;
  coverUrl: string;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  totalFavorites: number;
  metaDescription: string;
  description: string;
  author: { name: string; avatarUrl: string };
  favoritePerson: { name: string; avatarUrl: string }[];
}

// Định nghĩa schema
const postSchema: Schema<IPost> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    publish: { type: String, enum: ['published', 'draft'], required: true },
    comments: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        message: { type: String, required: true },
        postedAt: { type: String, required: true },
        users: [{ id: String, name: String, avatarUrl: String }],
        replyComment: [
          {
            id: { type: String, required: true },
            userId: { type: String, required: true },
            message: { type: String, required: true },
            postedAt: { type: String, required: true },
            tagUser: { type: String, default: null },
          },
        ],
      },
    ],
    metaKeywords: [{ type: String }],
    content: { type: String, required: true },
    tags: [{ type: String }],
    metaTitle: { type: String, required: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
    title: { type: String, required: true },
    coverUrl: { type: String, required: true },
    totalViews: { type: Number, required: true, min: 0 },
    totalShares: { type: Number, required: true, min: 0 },
    totalComments: { type: Number, required: true, min: 0 },
    totalFavorites: { type: Number, required: true, min: 0 },
    metaDescription: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatarUrl: { type: String, required: true },
    },
    favoritePerson: [
      {
        name: { type: String, required: true },
        avatarUrl: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Tạo model
export const Post = mongoose.model<IPost>('Post', postSchema);
