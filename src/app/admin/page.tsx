import DashBoardCard from "@/components/dashboard/DashBoardCard";
import LoadingIndicator from "@/components/ui/Loading";
import prisma from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

import React, { Suspense } from "react";

async function getSalesData() {
  const salesData = await prisma.order.aggregate({
    _sum: { pricePaidIncents: true },
    _count: true,
  });
  // await wait(3000);
  return {
    amount: (salesData._sum.pricePaidIncents || 0) / 100,
    numberOfSales: salesData._count,
  };
}
// function wait(duration: number) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }
async function getCustomersData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidIncents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidIncents || 0) / userCount / 100,
  }; //convert to rupees
}

async function getActiveProducts() {
  const [activeProductsCount, inactiveProductsCount] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    prisma.product.count({
      where: { isAvailableForPurchase: false },
    }),
  ]);

  return {
    activeProductsCount,
    inactiveProductsCount,
  };
}

export default async function AdminDashBoard() {
  const [salesData, customersData, activeProductsData] = await Promise.all([
    getSalesData(),
    getCustomersData(),
    getActiveProducts(),
  ]);

  const dashboardItems = [
    {
      title: "sales",
      subtitle: formatNumber(salesData.numberOfSales),
      body: formatCurrency(salesData.amount),
    },
    {
      title: "Customers",
      subtitle: `${formatCurrency(
        customersData.averageValuePerUser
      )} spent on average`,
      body: formatNumber(customersData.userCount),
    },
    {
      title: "Active Products",
      subtitle: `${formatNumber(
        activeProductsData.inactiveProductsCount
      )} Inactive`,
      body: formatNumber(activeProductsData.activeProductsCount),
    },
    {
      title: "sales",
      subtitle: formatNumber(salesData.numberOfSales),
      body: formatCurrency(salesData.amount),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense fallback={<LoadingIndicator />}>
        {dashboardItems.map((item, index) => (
          <DashBoardCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            body={item.body}
          />
        ))}
      </Suspense>
    </div>
  );
}
