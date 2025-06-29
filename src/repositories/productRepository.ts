import type {FilterQuery} from "mongoose";
import type { IProduct } from 'src/models/product.model';

import { Product } from 'src/models/product.model'

// Interface cho dữ liệu đầu vào khi tạo/cập nhật
export interface IProductInput {
  name: string;
  price: number;
  description?: string;
  category: string;
}

export class ProductRepository {
  // Create
  async create(productInput: IProductInput): Promise<IProduct> {
    try {
      const product = new Product({
        name: productInput.name,
        price: productInput.price,
        description: productInput.description || '',
        category: productInput.category,
      });
      return await product.save();
    } catch (err: any) {
      throw new Error(`Lỗi khi tạo sản phẩm: ${err.message}`);
    }
  }

  // Read: Lấy tất cả sản phẩm
  async findAll(): Promise<IProduct[]> {
    try {
      return await Product.find();
    } catch (err: any) {
      throw new Error(`Lỗi khi lấy danh sách sản phẩm: ${err.message}`);
    }
  }

  // Read: Lấy sản phẩm theo ID
  async findById(id: string): Promise<IProduct | null> {
    try {
      return await Product.findById(id);
    } catch (err: any) {
      throw new Error(`Lỗi khi lấy sản phẩm theo ID: ${err.message}`);
    }
  }

  // Read: Lấy sản phẩm theo điều kiện
  async findByQuery(query: FilterQuery<IProduct>): Promise<IProduct[]> {
    try {
      return await Product.find(query);
    } catch (err: any) {
      throw new Error(`Lỗi khi tìm sản phẩm: ${err.message}`);
    }
  }

  // Update
  async update(id: string, productInput: Partial<IProductInput>): Promise<IProduct | null> {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { ...productInput, updatedAt: new Date() },
        { new: true }
      );
      return product;
    } catch (err: any) {
      throw new Error(`Lỗi khi cập nhật sản phẩm: ${err.message}`);
    }
  }

  // Delete
  async delete(id: string): Promise<void> {
    try {
      const result = await Product.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Sản phẩm không tồn tại');
      }
    } catch (err: any) {
      throw new Error(`Lỗi khi xóa sản phẩm: ${err.message}`);
    }
  }
}
