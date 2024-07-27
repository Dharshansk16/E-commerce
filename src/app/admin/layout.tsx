import { Navbar, NavLink } from "@/components/navbar/Navbar";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="admin/products">Products</NavLink>
        <NavLink href="admin/users">Customers</NavLink>
        <NavLink href="admin/orders">Sales</NavLink>
      </Navbar>
      <div className="container my-6 ">{children}</div>
    </>
  );
}
