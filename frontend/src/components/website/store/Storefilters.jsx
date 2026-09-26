import { fetchCategory, fetchRooms } from "@/api/api";
import FilterSection from "./Filter.section";
import StookFilter from "./StookFilter";
import PriceFilter from "./Price.Filter";

const materials = [
  "Solid Wood",
  "Velvet",
  "Linen",
  "Marble",
  "Leather",
];

const colors = [
  { name: "Walnut Brown", hex: "#7a5230" },
  { name: "Ivory", hex: "#f2ede4" },
  { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Sage Green", hex: "#8a9a7b" },
  { name: "Terracotta", hex: "#c2683f" },
  { name: "Navy", hex: "#2f3e56" },
];

export default async function StoreFilters() {
  const categories = await fetchCategory();
  const rooms = await fetchRooms();

  return (
   <aside className="w-full shrink-0 lg:w-64">

  {/*  FILTER TITLE  */}
  <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-900">
    Filters
  </h2>

  {/* CATEGORY */}
  <div className="mt-5 border-t border-stone-200 pt-5">
    <FilterSection
      title="Category"
      data={categories?.data || []}
      queryKey="category"
    />
  </div>

  {/*  ROOM TYPE  */}
  <div className="mt-5 border-t border-stone-200 pt-5">
    <FilterSection
      title="Room Type"
      data={rooms?.data || []}
      queryKey="room"
    />
  </div>

  {/*  PRICE RANGE  */}
<PriceFilter />



  {/*  COLOR  */}
  <div className="mt-5 border-t border-stone-200 pt-5">
    <h3 className="text-sm font-medium text-stone-900">
      Color
    </h3>

    <div className="mt-3 flex flex-wrap gap-2.5">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          aria-label={color.name}
          title={color.name}
          className="h-7 w-7 rounded-full ring-1 ring-stone-300 ring-offset-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: color.hex,
          }}
        />
      ))}
    </div>
  </div>

  {/*  AVAILABILITY  */}
  <StookFilter />

</aside>
  );
}