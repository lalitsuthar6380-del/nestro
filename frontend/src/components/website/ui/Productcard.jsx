import Link from "next/link";
import Image from "next/image";
import CartBtn from "./CartBtn";

export default function ProductCard({ product }) {
  const {
    _id,
    thumbnail,
    categoryId,
    name,
    salePrice,
    originalPrice,
  } = product;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E8E0D5] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EBE3]">

        {thumbnail ? (
          <Link href={`/product/${_id}`}>
            <Image
              src={thumbnail}
              alt={name}
              fill
              sizes="(max-width:768px) 100vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-[#C6A27E]/40">
            🛋
          </div>
        )}

        {/* New Badge */}
        <span className="absolute left-4 top-4 rounded-md bg-[#2C2016] px-3 py-1 text-[11px] tracking-wider text-[#D6BFA7]">
          NEW
        </span>

        {/* Add Cart */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#2C2016]/90 py-2.5 text-center text-[11px] uppercase tracking-[0.1em] text-[#D6BFA7] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View
          </div>
        </div>

      </div>

      {/* Content */}
      <div className="px-5 py-4">

        {categoryId && (
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">
            {categoryId?.name}
          </p>
        )}

        <h3 className="line-clamp-1 text-[18px] font-medium text-[#1E1E1E]">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">

          <div>
            <p className="text-[20px] font-semibold text-[#1E1E1E]">
              ₹{salePrice}
            </p>

            {originalPrice && (
              <p className="text-xs text-[#6B7280] line-through">
                ₹{originalPrice}
              </p>
            )}
          </div>

          {/* Static Cart Button */}
          <CartBtn product={product} />

        </div>

      </div>

    </div>
  );
}