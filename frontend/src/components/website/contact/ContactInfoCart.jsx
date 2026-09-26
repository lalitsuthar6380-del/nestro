"use client";

import React from "react";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

// =========================
// CONTACT INFO ROW
// =========================

function ContactInfoRow({
  icon: Icon,
  title,
  lines,
  social,
  links = [],
}) {
  return (
    <div className="flex items-start gap-4">
      {/* ICON */}

      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#f0e6da]">
        <Icon className="h-4 w-4 text-[#5c3a24]" />
      </span>

      {/* CONTENT */}

      <div className="min-w-0">
        <p className="text-sm font-semibold text-stone-900">
          {title}
        </p>

        {/* TEXT LINES */}

        {lines.map((line, index) => (
          <p
            key={index}
            className={`break-words ${
              index === 0
                ? "text-sm text-stone-700"
                : "text-xs text-stone-400"
            }`}
          >
            {line}
          </p>
        ))}

        {/* SOCIAL LINKS */}

        {social && (
          <div className="mt-2 flex items-center gap-2.5">
            {links.map(
              ({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white transition-opacity hover:opacity-80"
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// =========================
// CONTACT INFO CARD
// =========================

export default function ContactInfoCard({
  phone = "+91 98765 43210",

  phoneHours = "Mon - Sat, 9:00 AM - 6:00 PM",

  email = "support@nestro.com",

  address = "Jaipur, Rajasthan, India",
}) {
  // =========================
  // SOCIAL LINKS
  // =========================

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },

    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },

    {
      icon: FaYoutube,
      href: "https://www.youtube.com/",
      label: "YouTube",
    },

    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
    },
  ];

  // =========================
  // RETURN UI
  // =========================

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex items-start gap-3">
        {/* HEADER ICON */}

        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#5c3a24]">
          <Phone className="h-5 w-5 text-white" />
        </span>

        {/* HEADER TEXT */}

        <div>
          <h2 className="text-base font-semibold text-stone-900 sm:text-lg">
            Our Contact Information
          </h2>

          <p className="text-xs text-stone-500 sm:text-sm">
            You can also reach us through the following
            channels.
          </p>
        </div>
      </div>

      {/* =========================
          CONTACT DETAILS
      ========================= */}

      <div className="flex flex-col gap-6">
        {/* =========================
            PHONE
        ========================= */}

        <ContactInfoRow
          icon={Phone}
          title="Call Us"
          lines={[
            phone,
            phoneHours,
          ]}
        />

        {/* =========================
            EMAIL
        ========================= */}

        <ContactInfoRow
          icon={Mail}
          title="Email Us"
          lines={[
            email,
            "We reply within 24 hours",
          ]}
        />

        {/* =========================
            ADDRESS
        ========================= */}

        <ContactInfoRow
          icon={MapPin}
          title="Visit Us"
          lines={[
            address,
          ]}
        />

        {/* =========================
            LIVE CHAT
        ========================= */}

        <ContactInfoRow
          icon={MessageCircle}
          title="Live Chat"
          lines={[
            "Chat with our support team",
            "Available on website",
          ]}
        />

        {/* =========================
            SOCIAL MEDIA
        ========================= */}

        <ContactInfoRow
          icon={Share2}
          title="Follow Us"
          lines={[
            "Stay updated with our latest collections",
          ]}
          social
          links={socialLinks}
        />
      </div>
    </div>
  );
}