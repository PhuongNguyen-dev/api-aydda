import type { Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

// Interface cho Product
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
  publish: 'published' | 'draft';
  ratings: { name: string; starCount: number; reviewCount: number }[];
  category: 'Shose' | 'Apparel' | 'Accessories';
  available: 10 | 0;
  priceSale: number | null;
  taxes: number;
  quantity: number;
  inventoryType: 'in stock' | 'low stock' | 'out of stock';
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

// Định nghĩa schema
const productSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gender: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    reviews: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        postedAt: { type: String, required: true },
        comment: { type: String, required: true },
        isPurchased: { type: Boolean, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        avatarUrl: { type: String, required: true },
        helpful: { type: Number, required: true, min: 0 },
        attachments: [{ type: String }],
      },
    ],
    publish: { type: String, enum: ['published', 'draft'], required: true },
    ratings: [
      {
        name: { type: String, required: true },
        starCount: { type: Number, required: true, min: 0, max: 5 },
        reviewCount: { type: Number, required: true, min: 0 },
      },
    ],
    category: { type: String, enum: ['Shose', 'Apparel', 'Accessories'], required: true },
    available: { type: Number, enum: [0, 10], required: true },
    priceSale: { type: Number, default: null },
    taxes: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    inventoryType: { type: String, enum: ['in stock', 'low stock', 'out of stock'], required: true },
    tags: [{ type: String }],
    code: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    sku: { type: String, required: true, unique: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    coverUrl: { type: String, required: true },
    colors: [{ type: String, required: true }],
    totalRatings: { type: Number, required: true, min: 0 },
    totalSold: { type: Number, required: true, min: 0 },
    totalReviews: { type: Number, required: true, min: 0 },
    newLabel: {
      enabled: { type: Boolean, required: true },
      content: { type: String, required: true },
    },
    saleLabel: {
      enabled: { type: Boolean, required: true },
      content: { type: String, required: true },
    },
    sizes: [{ type: String, required: true }],
    subDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

// Tạo model
export const Product = mongoose.model<IProduct>('Product', productSchema);
