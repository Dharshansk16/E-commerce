"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { formatCurrency } from "@/lib/formatter";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "../../_actions/product";
import { Button } from "@/components/ui/button";

export default function ProductForm() {
  const [pricePaidIncents, setPriceIncents] = useState<number | undefined>(0);

  return (
    <form action={addProduct} className="my-8">
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
            setPriceIncents(Number(e.target.value) || undefined);
          }}
          required
        />

        <div className="text-muted-foreground">
          {formatCurrency((pricePaidIncents || 0) / 100)}
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div className="mb-4">
        <Label htmlFor="file">File</Label>
        <Input
          className="text-zinc-500"
          type="file"
          id="file"
          name="file"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="image">Image</Label>
        <Input
          className="text-zinc-500"
          type="file"
          id="image"
          name="image"
          required
        />
      </div>
      <div className="mb-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
