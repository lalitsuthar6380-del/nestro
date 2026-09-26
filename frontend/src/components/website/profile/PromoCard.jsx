"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function PromoCard() {
  const router = useRouter();

  return (
    <section className="relative h-[300px] w-full overflow-hidden rounded-2xl">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80&w=800&auto=format&fit=crop"
        alt="Bright living room"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-5">

        {/* Heading */}
        <div>
          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">
            Nestro Collection
          </p>

          <h3 className="font-serif text-xl font-medium leading-tight text-white">
            Make Every
            <br />
            Corner Count
          </h3>
        </div>

        {/* Bottom */}
        <div>
          <p className="mb-3 max-w-[190px] text-[11px] leading-4 text-white/85">
            Premium furniture for a better tomorrow.
          </p>

          <button
            type="button"
            onClick={() => router.push("/store")}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3.5 text-[11px] font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Explore Collection
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}