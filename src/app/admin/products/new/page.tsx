import React from "react";
import PageHeader from "../../_admin_components/common/PageHeader";
import ProductForm from "../_components/ProductForm";

export default function NewProductsPage() {
  return (
    <div>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </div>
  );
}
