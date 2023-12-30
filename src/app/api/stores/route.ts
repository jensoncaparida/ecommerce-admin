import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { name } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse('Store name is required.', {
        status: 400,
      });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST_ERROR]', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
