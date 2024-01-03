import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    if (!params.categoryId) {
      return new NextResponse(
        'The request could not be processed because the "categoryId" parameter is missing.',
        { status: 400 },
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        banner: true,
        parent: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_BY_ID_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, bannerId, isParent, parentId } = body;

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

    if (!params.categoryId) {
      return new NextResponse(
        'The request could not be processed because the "categoryId" parameter is missing.',
        { status: 400 },
      );
    }

    if (!name) {
      return new NextResponse(
        'Your request is missing a required parameter: "name".',
        { status: 400 },
      );
    }

    if (!bannerId) {
      return new NextResponse(
        'Your request is missing a required parameter: "bannerId".',
        { status: 400 },
      );
    }

    if (!isParent) {
      return new NextResponse(
        'Your request is missing a required parameter: "isParent".',
        { status: 400 },
      );
    }

    if (!parentId) {
      return new NextResponse(
        'Your request is missing a required parameter: "parentId".',
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

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        bannerId: bannerId || null,
        isParent: isParent || false,
        parentId: parentId || null,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
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

    if (!params.categoryId) {
      return new NextResponse(
        'The request could not be processed because the "categoryId" parameter is missing.',
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

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
