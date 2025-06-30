// app/api/seed/route.ts
import { NextResponse } from 'next/server';

import { seedProducts } from '../../../seedProducts';

export async function POST() {
  try {
    await seedProducts();
    return NextResponse.json({ message: 'Seeding completed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
