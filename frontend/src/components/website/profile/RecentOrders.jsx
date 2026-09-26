"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { client } from "@/utils/helper";
import { toast } from "sonner";

const statusStyles = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Processing: "bg-purple-100 text-purple-700",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await client.get(
        "order/my-orders?limit=3"
      );

      setOrders(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load recent orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5C4A3A] text-white">
            <ShoppingBag
              size={16}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-900">
              Recent Orders
            </h2>

            <p className="mt-0.5 text-[10px] text-stone-500">
              Your latest purchases.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-700 transition hover:text-black"
        >
          View All
          <ArrowRight size={12} />
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 text-xs text-stone-500">
          <Loader2
            size={16}
            className="mr-2 animate-spin"
          />
          Loading orders...
        </div>
      )}

      {/* Empty State */}
      {!loading && orders.length === 0 && (
        <div className="rounded-xl border border-dashed border-stone-200 py-8 text-center">

          <ShoppingBag
            size={26}
            className="mx-auto mb-2 text-stone-400"
          />

          <h3 className="text-xs font-semibold text-stone-800">
            No orders yet
          </h3>

          <p className="mt-1 text-[10px] text-stone-500">
            Your recent purchases will appear here.
          </p>

        </div>
      )}

      {/* Orders */}
      {!loading && orders.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">

          {orders.map((order) => {
            const firstItem = order.items?.[0];
            const product = firstItem?.product_id;

            const status = order.status || "Pending";

            const image =
              product?.thumbnail ||
              "https://via.placeholder.com/200";

            const productName =
              product?.title || "Product";

            const quantity =
              order.items?.reduce(
                (total, item) =>
                  total + (item.qty || 0),
                0
              ) || 0;

            return (
              <div
                key={order._id}
                className="rounded-xl border border-stone-200 p-3"
              >

                {/* Product */}
                <div className="flex items-center gap-2.5">

                  <img
                    src={image}
                    alt={productName}
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-stone-900">
                      {productName}
                    </p>

                    <p className="mt-0.5 text-[10px] text-stone-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                </div>

                {/* Divider */}
                <div className="my-2.5 border-t border-stone-100" />

                {/* Bottom */}
                <div className="flex items-end justify-between gap-2">

                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      ₹
                      {Number(
                        order.total_amount || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    {quantity > 0 && (
                      <p className="mt-0.5 text-[9px] text-stone-500">
                        {quantity}{" "}
                        {quantity === 1 ? "item" : "items"}
                      </p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${
                      statusStyles[status] ||
                      "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {status}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}