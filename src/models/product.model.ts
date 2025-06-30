// src/models/product.model.ts
import type { Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  gender: string[];
  images: string[];
  reviews: {
    id: string;
    name: string;
    postedAt: string;
    comment: string;
    isPurchased: boolean;
    rating: number;
    avatarUrl: string;
    helpful: number;
    attachments: string[];
  }[];
  publish: string;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  category: string;
  available: number;
  priceSale: number | null;
  taxes: number;
  quantity: number;
  inventoryType: string;
  tags: string[];
  code: string;
  description: string;
  sku: string;
  createdAt: string;
  name: string;
  price: number;
  coverUrl: string;
  colors: string[];
  totalRatings: number;
  totalSold: number;
  totalReviews: number;
  newLabel: { enabled: boolean; content: string };
  saleLabel: { enabled: boolean; content: string };
  sizes: string[];
  subDescription: string;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gender: [{ type: String, required: true }],
    images: [{ type: String }],
    reviews: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        postedAt: { type: String, required: true },
        comment: { type: String, required: true },
        isPurchased: { type: Boolean, required: true },
        rating: { type: Number, required: true },
        avatarUrl: { type: String, required: true },
        helpful: { type: Number, required: true },
        attachments: [{ type: String }],
      },
    ],
    publish: { type: String, required: true },
    ratings: [
      {
        name: { type: String, required: true },
        starCount: { type: Number, required: true },
        reviewCount: { type: Number, required: true },
      },
    ],
    category: { type: String, required: true },
    available: { type: Number, required: true },
    priceSale: { type: Number, default: null },
    taxes: { type: Number, required: true },
    quantity: { type: Number, required: true },
    inventoryType: { type: String, required: true },
    tags: [{ type: String }],
    code: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true },
    createdAt: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    coverUrl: { type: String, required: true },
    colors: [{ type: String }],
    totalRatings: { type: Number, required: true },
    totalSold: { type: Number, required: true },
    totalReviews: { type: Number, required: true },
    newLabel: {
      enabled: { type: Boolean, required: true },
      content: { type: String, required: true }, // Có thể đổi thành required: false nếu cần
    },
    saleLabel: {
      enabled: { type: Boolean, required: true },
      content: { type: String, required: true }, // Có thể đổi thành required: false nếu cần
    },
    sizes: [{ type: String }],
    subDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
