import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { OrderColumn } from './components/columns';
import { OrderContent } from './components/content';
import { formatter } from '@/lib/utils';

async function OrdersPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price) * item.quantity;
      }, 0),
    ),

    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <OrderContent data={formattedOrders} />
    </div>
  );
}

export default OrdersPage;
