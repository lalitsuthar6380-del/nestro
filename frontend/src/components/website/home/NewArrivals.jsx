import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/api/api";

export default async function NewArrivals() {
  const response = await fetchProducts();

  const products = Array.isArray(response)
    ? response
    : response?.data || response?.products || [];

  // Temporary: status wale products dikhao
  const newArrivals = products.filter((product) => product.status);

  // Featured Product
  const featuredProduct = newArrivals[0];

  // Other Products
  const otherProducts = newArrivals.slice(1, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            New Arrivals
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-stone-900 sm:text-3xl">
            Just Landed
          </h2>
        </div>

        <Link
          href="/store"
          className="hidden text-sm font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-amber-700 sm:block"
        >
          View all
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Featured Product */}
        {featuredProduct && (
          <Link
            href={`/product/${featuredProduct.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-stone-900"
          >
            <img
              src={featuredProduct.thumbnail}
              alt={featuredProduct.title}
              className="h-72 w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 lg:h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="rounded-full bg-amber-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                New
              </span>

              <h3 className="mt-3 text-xl font-semibold text-white">
                {featuredProduct.title}
              </h3>

              <p className="mt-1 text-sm text-stone-300">
                {featuredProduct.shortDescription}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold text-white">
                  ₹{featuredProduct.salePrice || featuredProduct.price}
                </span>

                <span className="text-xs font-medium text-amber-300 underline underline-offset-4">
                  View in Store
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Other Products */}
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          {otherProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              href={`/product/${product.slug}`}
              image={product.thumbnail}
              category={product.material || ""}
              name={product.title}
              rating={5}
              price={`₹${product.salePrice || product.price}`}
              originalPrice={
                product.salePrice
                  ? `₹${product.price}`
                  : undefined
              }
              badge={
                product.bestSeller
                  ? "BESTSELLER"
                  : product.discount > 0
                  ? "SALE"
                  : ""
              }
            />
          ))}

          {/* Offer Card */}
          <div className="col-span-2 flex flex-col justify-center rounded-2xl bg-amber-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Offer
              </span>

              <h4 className="mt-1 text-lg font-semibold text-stone-900">
                First order 15% off
              </h4>

              <p className="text-sm text-stone-600">
                Use code NESTRO15 at checkout
              </p>
            </div>

            <Link
              href="/store"
              className="mt-4 inline-block rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 sm:mt-0"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}