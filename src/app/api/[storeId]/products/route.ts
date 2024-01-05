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

    const {
      name,
      description,
      price,
      categoryId,
      brandId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;

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

    if (!description) {
      return new NextResponse(
        'Your request is missing a required parameter: "description".',
        { status: 400 },
      );
    }

    if (!images || !images.length) {
      return new NextResponse(
        'Your request is missing a required parameter: "images".',
        { status: 400 },
      );
    }

    if (!price) {
      return new NextResponse(
        'Your request is missing a required parameter: "price".',
        { status: 400 },
      );
    }

    if (!categoryId) {
      return new NextResponse(
        'Your request is missing a required parameter: "categoryId".',
        { status: 400 },
      );
    }
    if (!brandId) {
      return new NextResponse(
        'Your request is missing a required parameter: "brandId".',
        { status: 400 },
      );
    }

    if (!sizeId) {
      return new NextResponse(
        'Your request is missing a required parameter: "sizeId".',
        { status: 400 },
      );
    }

    if (!colorId) {
      return new NextResponse(
        'Your request is missing a required parameter: "colorId".',
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
      return new NextResponse('Access Denied. Unauthenticated.', {
        status: 403,
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        isFeatured,
        isArchived,
        categoryId,
        brandId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse(
        'Your request is missing a required parameter: "storeId".',
        { status: 400 },
      );
    }

    const products = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}