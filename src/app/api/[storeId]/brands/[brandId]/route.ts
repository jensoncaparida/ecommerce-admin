import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } },
) {
  try {
    if (!params.brandId) {
      return new NextResponse(
        'The request could not be processed because the "brandId" parameter is missing.',
        { status: 400 },
      );
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRAND_BY_ID_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Access Denied. Unauthenticated', {
        status: 403,
      });
    }

    if (!params.storeId) {
      return new NextResponse(
        'The request could not be processed because the "storeId" parameter is missing.',
        { status: 400 },
      );
    }

    if (!params.brandId) {
      return new NextResponse(
        'The request could not be processed because the "brandId" parameter is missing.',
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
      return new NextResponse('Access Denied. Unauthorized', { status: 405 });
    }

    const brand = await prisma.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRAND_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

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

    if (!params.brandId) {
      return new NextResponse(
        'The request could not be processed because the "brandId" parameter is missing.',
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
      return new NextResponse('Access Denied. Unauthorized', { status: 405 });
    }

    const brand = await prisma.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRAND_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
