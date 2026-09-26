import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/api/api";

export default async function Seller() {
  const response = await fetchProducts();

  // API response handle
  const products = Array.isArray(response)
    ? response
    : response?.data || response?.products || [];

  // Sirf Best Seller Products
  const bestSellers = products.filter(
    (product) => product.bestSeller && product.status
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Handpicked for you
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Best Sellers
          </h2>
        </div>

        <Link
          href="/store"
          className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-amber-700 sm:block"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
        {bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              href={`/product/${product.slug}`}
              image={product.thumbnail}
              category=""
              name={product.title}
              rating={5}
              price={`₹${product.salePrice || product.price}`}
              badge={product.discount > 0 ? `${product.discount}% OFF` : ""}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-stone-500">
            No Best Seller Products Found.
          </p>
        )}
      </div>

      <Link
        href="/store"
        className="mt-6 block text-center text-sm font-medium text-stone-700 underline underline-offset-4 sm:hidden"
      >
        View all
      </Link>
    </section>
  );
}