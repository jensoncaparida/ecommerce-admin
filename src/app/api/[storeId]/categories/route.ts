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

    const { name, bannerId, isParent, parentId } = body;

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
      return new NextResponse('Access Denied. Unauthenticated.', {
        status: 405,
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        bannerId: bannerId || null,
        isParent: isParent || false,
        parentId: parentId || null,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
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

    const categorys = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categorys);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
