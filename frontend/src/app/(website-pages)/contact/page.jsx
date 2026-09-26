"use client";

import React from "react";

import Breadcrumb from "@/components/website/contact/Breadcrumb";
import ContactHero from "@/components/website/contact/ContactHero";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactInfoCard from "@/components/website/contact/ContactInfoCart";
import MapPlaceholder from "@/components/website/contact/MapPlaceholder";
import FaqSection from "@/components/website/contact/FaqSection";

export default function ContactPage({
  heroImage,

  address = "Gopalpura Mode, Jaipur, Rajasthan India - 302018",

  phone = "+91 98765 43210",

  phoneHours = "Mon - Sat, 9:00 AM - 7:00 PM",

  email = "support@nestro.com",

  faqs,

  subjects,

  onLetsTalk,

  onViewAllFaq,
}) {
  return (
    <div className="w-full bg-[#f7f3ec]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =========================
            BREADCRUMB
        ========================= */}

        <Breadcrumb
          items={[
            { label: "Home" },
            { label: "Contact" },
          ]}
        />

        {/* =========================
            HERO
        ========================= */}

        <ContactHero
          heroImage={heroImage}
          onLetsTalk={onLetsTalk}
        />

        {/* =========================
            CONTACT FORM + INFO
        ========================= */}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-[1.6fr_1fr]">

          {/* Contact Form */}
          <ContactForm
            subjects={subjects}
          />

          {/* Contact Information */}
          <ContactInfoCard
            phone={phone}
            phoneHours={phoneHours}
            email={email}
            address={address}
          />
        </div>

        {/* =========================
            MAP + FAQ
        ========================= */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* Map */}
          <MapPlaceholder
            address={address}
          />

          {/* FAQ */}
          <FaqSection
            faqs={faqs}
            onViewAll={onViewAllFaq}
          />
        </div>

      </div>
    </div>
  );
}