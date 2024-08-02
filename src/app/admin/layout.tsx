import { Navbar, NavLink } from "./_admin_components/common/navbar/Navbar";
import React from "react";

export const dynamic = "force-dynamic"; //removes caching in admin page since we want most recent
//data to be updated

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Navbar>
      <div className="container my-6 ">{children}</div>
    </>
  );
}
