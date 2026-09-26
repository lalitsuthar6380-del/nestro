import { fetchProducts } from "@/api/api";
import StoreProductGrid from "@/components/website/store/Storeproductgrid";
import React from "react";
import StoreOfferBanner from "@/components/website/store/Storeofferbanner";
import StorePagination from "@/components/website/store/Storepageination";

export default async function Page({ searchParams }) {
  const query = await searchParams;

  // Filters
  const category = query.category || null;
  const room = query.room || null;
  const stock = query.stock || null;
  const min_price = query.min_price || null;
  const max_price = query.max_price || null;

  // Current page
  const page = Number(query.page) || 1;

  // Fetch products
  const response = await fetchProducts({
    category,
    room,
    stock,
    min_price,
    max_price,
    page,
  });

  return (
    <>
      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        {response?.data?.map((product) => (
          <StoreProductGrid
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {/* Offer Banner */}
      <StoreOfferBanner />

      {/* Pagination */}
      <StorePagination
        pages={response?.pages || 5}
      />
    </>
  );
}
 