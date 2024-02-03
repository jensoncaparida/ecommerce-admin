import { getRevenueGraph } from '@/actions/get-revenue-graph';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { getTotalSales } from '@/actions/get-total-sales';
import { getTotalStock } from '@/actions/get-total-stock';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OverviewGraph } from '@/components/overviewGraph';

import { formatter } from '@/lib/utils';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const totalStock = await getTotalStock(params.storeId);
  const revenueGraph = await getRevenueGraph(params.storeId);

  return (
    <div className="space-y-4 px-10 py-4">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Total Products in Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{totalStock}</div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewGraph data={revenueGraph} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
