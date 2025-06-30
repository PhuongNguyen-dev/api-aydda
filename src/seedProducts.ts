// src/seedProducts.ts
import mongoose from 'mongoose';

import { Product } from './models/product.model';
import { initialDataBase } from './repositories/mongoDBConecter';

export async function seedProducts() {
  try {
    // Kết nối MongoDB
    await initialDataBase();

    // Kiểm tra xem collection đã có dữ liệu chưa
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log('Collection products đã có dữ liệu, bỏ qua seeding.');
      await mongoose.connection.close();
      return;
    }

    // Dữ liệu mẫu
    const sampleProducts = [
      {
        id: 'prod_001',
        gender: ['Male', 'Female'],
        images: [
          'https://example.com/images/product1-1.jpg',
          'https://example.com/images/product1-2.jpg',
        ],
        reviews: [
          {
            id: 'review_001',
            name: 'Nguyễn Văn A',
            postedAt: new Date().toISOString(),
            comment: 'Sản phẩm rất đẹp, chất lượng tốt!',
            isPurchased: true,
            rating: 4,
            avatarUrl: 'https://example.com/avatars/user1.jpg',
            helpful: 10,
            attachments: ['https://example.com/attachments/review1.jpg'],
          },
        ],
        publish: 'published',
        ratings: [
          {
            name: 'Chất lượng',
            starCount: 4,
            reviewCount: 50,
          },
        ],
        category: 'Shose',
        available: 10,
        priceSale: 120000,
        taxes: 10000,
        quantity: 100,
        inventoryType: 'in stock',
        tags: ['giày thể thao', 'thoáng khí', 'mới'],
        code: 'SHOE001',
        description: 'Giày thể thao thời trang, phù hợp cho cả nam và nữ.',
        sku: 'SKU001',
        createdAt: new Date().toISOString(),
        name: 'Giày thể thao XYZ',
        price: 150000,
        coverUrl: 'https://example.com/images/cover1.jpg',
        colors: ['Black', 'White'],
        totalRatings: 4.5,
        totalSold:  200,
        totalReviews: 50,
        newLabel: {
          enabled: true,
          content: 'Sản phẩm mới',
        },
        saleLabel: {
          enabled: true,
          content: 'Giảm giá 20%',
        },
        sizes: ['38', '39', '40', '41'],
        subDescription: 'Thiết kế hiện đại, chất liệu cao cấp.',
      },
      {
        id: 'prod_002',
        gender: ['Female'],
        images: ['https://example.com/images/product2-1.jpg'],
        reviews: [],
        publish: 'draft',
        ratings: [
          {
            name: 'Chất lượng',
            starCount: 3,
            reviewCount: 20,
          },
        ],
        category: 'Apparel',
        available: 0,
        priceSale: null,
        taxes: 5000,
        quantity: 50,
        inventoryType: 'out of stock',
        tags: ['áo thun', 'thoải mái'],
        code: 'APPAREL001',
        description: 'Áo thun nữ cao cấp.',
        sku: 'SKU002',
        createdAt: new Date().toISOString(),
        name: 'Áo thun nữ ABC',
        price: 80000,
        coverUrl: 'https://example.com/images/cover2.jpg',
        colors: ['Red', 'Blue'],
        totalRatings: 3.5,
        totalSold: 100,
        totalReviews: 20,
        newLabel: {
          enabled: false,
          content: 'Không có nhãn mới', // Sửa chuỗi rỗng thành giá trị hợp lệ
        },
        saleLabel: {
          enabled: false,
          content: 'Không có khuyến mãi', // Sửa chuỗi rỗng thành giá trị hợp lệ
        },
        sizes: ['S', 'M', 'L'],
        subDescription: 'Phong cách trẻ trung, năng động.',
      },
    ];

    // Xóa collection hiện tại
    await Product.deleteMany({});

    // Chèn dữ liệu mẫu
    await Product.insertMany(sampleProducts);
    console.log('Chèn dữ liệu mẫu thành công!');

    // Đóng kết nối
    await mongoose.connection.close();
  } catch (error) {
    console.error('Lỗi khi chèn dữ liệu:', error);
    throw error;
  }
}
