import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Access Denied. Unauthenticated.', {
        status: 403,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        'The request could not be processed because the "storeId" parameter is missing.',
        { status: 400 },
      );
    }

    if (!name) {
      return new NextResponse(
        'Your request is missing a required parameter: "name".',
        { status: 400 },
      );
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Access Denied. Unauthorized.', { status: 405 });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRANDS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse(
        'The request could not be processed because the "storeId" parameter is missing.',
        { status: 400 },
      );
    }

    const banners = await prisma.brand.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.log('[BRANDS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
