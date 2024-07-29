import DashBoardCard from "@/components/dashboard/DashBoardCard";
import prisma from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

import React from "react";

async function getSalesData() {
  const salesData = await prisma.order.aggregate({
    _sum: { pricePaidIncents: true },
    _count: true,
  });
  return {
    amount: (salesData._sum.pricePaidIncents || 0) / 100,
    numberOfSales: salesData._count,
  };
}

async function getCustomersData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidIncents: true },
    }),
  ]);

  return {
    userCount,
    avergeValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidIncents || 0) / userCount / 100,
  }; //convert to rupees
}

export default async function AdminDashBoard() {
  const [salesData, customersData] = await Promise.all([
    getSalesData(),
    getCustomersData(),
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
        customersData.avergeValuePerUser
      )} spent on average`,
      body: formatNumber(customersData.userCount),
    },
    {
      title: "sales",
      subtitle: formatNumber(salesData.numberOfSales),
      body: formatCurrency(salesData.amount),
    },

    {
      title: "sales",
      subtitle: formatNumber(salesData.numberOfSales),
      body: formatCurrency(salesData.amount),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardItems.map((item, index) => (
        <DashBoardCard
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          body={item.body}
        />
      ))}
    </div>
  );
}
