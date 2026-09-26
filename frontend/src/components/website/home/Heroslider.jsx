"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        eyebrow: "Summer Collection 2026",
        titleStart: "Where Comfort",
        titleItalic: "Meets Craft",
        description:
            "Scandinavian-inspired furniture for modern living. Curated pieces that endure seasons.",
        primaryCta: "Shop Collection",
        secondaryCta: "View Lookbook",
        image:
            "https://images.unsplash.com/photo-1758448511322-8bfc73daf606?auto=format&fit=crop&w=1400&q=80",
    },
    {
        eyebrow: "Bedroom Edit",
        titleStart: "Rest,",
        titleItalic: "Reimagined",
        description:
            "Soft textures and calm tones for a bedroom that feels like a retreat.",
        primaryCta: "Shop Bedroom",
        secondaryCta: "View Lookbook",
        image:
            "https://images.unsplash.com/photo-1748679979601-dc9ec43d900d?auto=format&fit=crop&w=1400&q=80",
    },
    {
        eyebrow: "New Arrivals",
        titleStart: "Gather Around",
        titleItalic: "Good Wood",
        description:
            "Solid-wood dining sets built for long dinners and longer conversations.",
        primaryCta: "Shop Dining",
        secondaryCta: "View Lookbook",
        image:
            "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1400&q=80",
    },
];
export default function Heroslider() {
    const [active, setActive] = useState(0);

    const goTo = useCallback((index) => {
        setActive((index + slides.length) % slides.length);
    }, []);

    // Auto Slider
    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const slide = slides[active];

    return (
        <section className="mx-auto mt-6 max-w-8xl px-4 lg:px-6">
            <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[420px]">

                {/* Background Image */}
                <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.titleStart}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/45"></div>

                {/* Content */}
                <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-14">
                    <p className="mb-4 text-xs uppercase tracking-[5px] text-[#C58A4A]">
                        {slide.eyebrow}
                    </p>

                    <h1 className="text-5xl font-light leading-tight text-white lg:text-6xl">
                        {slide.titleStart}{" "}
                        <span className="font-serif italic text-[#D7B08A]">
                            {slide.titleItalic}
                        </span>
                    </h1>

                    <p className="mt-5 max-w-md text-lg leading-8 text-gray-200">
                        {slide.description}
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="rounded-md bg-[#A86F42] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#8D5E38]">
                            {slide.primaryCta}
                        </button>

                        <button className="rounded-md border border-[#8C6A4A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black">
                            {slide.secondaryCta}
                        </button>
                    </div>
                </div>

                {/* Left Arrow */}
                <button
                    onClick={() => goTo(active - 1)}
                    aria-label="Previous slide"
                    className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => goTo(active + 1)}
                    aria-label="Next slide"
                    className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-black/40"
                >
                    <ChevronRight size={22} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-14 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-[3px] transition-all duration-300 ${index === active
                                    ? "w-8 bg-[#C58A4A]"
                                    : "w-5 bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}