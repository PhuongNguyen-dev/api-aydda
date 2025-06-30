// app/api/product/list/route.ts

'use server';

import { NextResponse } from 'next/server';

import { initialDataBase } from '../../../../repositories/mongoDBConecter';
import { ProductRepository } from '../../../../repositories/productRepository';

export async function GET() {
  try {
    // Đảm bảo kết nối MongoDB
    await initialDataBase();
    const repository = new ProductRepository();
    const products = await repository.findAll();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error('[Product - Get list]:', error);
    return NextResponse.json({ error: 'Failed to fetch products', details: error.message }, { status: 500 });
  }
}
