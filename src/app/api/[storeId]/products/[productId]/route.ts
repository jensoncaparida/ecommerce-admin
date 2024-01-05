import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse(
        'The request could not be processed because the "productId" parameter is missing.',
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        brand: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_BY_ID_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
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

    if (!params.productId) {
      return new NextResponse(
        'The request could not be processed because the "productId" parameter is missing.',
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
      return new NextResponse('Access Denied. Unauthorized', { status: 405 });
    }

    await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        categoryId,
        brandId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Access Denied. Unauthenticated.', {
        status: 403,
      });
    }

    if (!params.productId) {
      return new NextResponse(
        'The request could not be processed because the "productId" parameter is missing.',
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

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
