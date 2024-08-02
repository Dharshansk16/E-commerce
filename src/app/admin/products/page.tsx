import React from "react";
import PageHeader from "../_admin_components/common/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsTable from "./_components/ProductsTable";

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </div>
  );
}
