import React from "react";
import { ArrowRight, Headphones, ShieldCheck, Heart } from "lucide-react";

function FeatureBadge({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-300">
        <Icon className="h-5 w-5 text-stone-700" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-sm font-semibold text-stone-900">{title}</p>
        <p className="text-xs text-stone-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function ContactHero({ heroImage, onLetsTalk }) {
  return (
    <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="text-xs font-medium tracking-wide text-[#8a5a34] sm:text-sm">
          Get in Touch
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl md:text-5xl">
          We&apos;re Here For You
        </h1>
        <p className="mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Have a question, need support, or just want to say hello? We&apos;d love
          to hear from you. Our team is always ready to help you create a
          better home.
        </p>
        <button
          type="button"
          onClick={onLetsTalk}
          className="mt-6 flex items-center gap-2 rounded-lg bg-[#5c3a24] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a2f1d] sm:text-base"
        >
          Let&apos;s Talk
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <FeatureBadge icon={Headphones} title="Friendly Support" subtitle="We're here to help" />
          <FeatureBadge icon={ShieldCheck} title="Quick Response" subtitle="Within 24 hours" />
          <FeatureBadge icon={Heart} title="Loved by 50K+" subtitle="Happy Customers" />
        </div>
      </div>

      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-stone-200 sm:aspect-16/11">
        {heroImage ? (
          <img
            src={heroImage}
            alt="A well-styled living room"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            Hero image
          </div>
        )}
      </div>
    </div>
  );
}