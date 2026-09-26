"use client";

export default function WelcomeBanner({ name = "Lalit" }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#DCD3C4]">
      <div className="grid grid-cols-1 items-stretch md:grid-cols-[1.1fr_1.35fr_0.9fr]">

        {/* Left Content */}
        <div className="flex flex-col justify-center p-5 md:p-6">

          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Welcome back
          </p>

          <h1 className="mb-2 font-serif text-2xl leading-tight text-stone-900 md:text-3xl">
            Hey, {name}!
          </h1>

          <p className="mb-3 text-xs text-stone-700">
            Good furniture brings good vibes.
          </p>

          <div className="mb-3 h-px w-7 bg-stone-500" />

          <p className="max-w-[230px] text-[10px] leading-4 text-stone-600">
            Manage your account and make your home more beautiful with
            Nestro.
          </p>

        </div>

        {/* Middle Image */}
        <div className="relative min-h-[150px] md:min-h-[190px]">

          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="Warm living room console with lamp and plant"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />

        </div>

        {/* Right Quote */}
        <div className="flex items-center bg-[#C9BCA6] p-5 md:p-6">

          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-500">
              Nestro
            </p>

            <p className="font-serif text-lg leading-snug text-stone-900 md:text-xl">
              &ldquo;A Better Home For A Brighter Tomorrow&rdquo;
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}