import ProductCard from "./Productcard";

export default function StoreProductGrid({ product }) {
  return (
    <ProductCard
      href={`/product/${product.slug}`}
      thumbnail={product.thumbnail}
      category={product.category}
      name={product.title}
      product={product}
      price={`₹${product.salePrice || product.price}`}
      originalPrice={
        product.salePrice ? `₹${product.price}` : null
      }
      badge={
        product.bestSeller
          ? "BESTSELLER"
          : product.newArrival
          ? "NEW"
          : product.discount > 0
          ? `-${product.discount}%`
          : null
      }
    />
  );
}
