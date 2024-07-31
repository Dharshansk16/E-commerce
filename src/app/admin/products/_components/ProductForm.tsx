"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { formatCurrency } from "@/lib/formatter";

export default function ProductForm() {
  const [pricePaidIncents, setPriceInRupees] = useState<number | undefined>(0);

  return (
    <form className="my-8">
      <div className="mb-4">
        <Label htmlFor="name">Product Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="mb-4">
        <Label htmlFor="pricePaidIncents">Price in Paisa</Label>
        <Input
          type="number"
          id="pricePaidIncents"
          name="pricePaidIncents"
          value={pricePaidIncents}
          onChange={(e) => {
            setPriceInRupees(Number(e.target.value) || undefined);
          }}
          required
        />

        <div className="text-muted-foreground">
          {formatCurrency((pricePaidIncents || 0) / 100)}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="name">Product Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
    </form>
  );
}
