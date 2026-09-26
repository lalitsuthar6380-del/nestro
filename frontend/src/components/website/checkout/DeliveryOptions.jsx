"use client";

import {
  Truck,
  Wallet,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const options = [
  {
    id: "cod",
    icon: Wallet,
    title: "Cash on Delivery",
    price: "Free",
    lines: [
      "Pay when you receive your order",
      "Safe & convenient",
    ],
  },
  {
    id: "online",
    icon: CreditCard,
    title: "Online Payment",
    price: "Free",
    lines: [
      "Pay now via UPI, Card, Net Banking",
      "Fast & secure payment",
    ],
  },
];

export default function DeliveryOptions({
  paymentMethod,
  setPaymentMethod,
}) {
  const selected = paymentMethod;

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8">

      <div className="flex items-center gap-3 mb-6">

        <div className="h-9 w-9 rounded-full bg-[#3C2E22] text-white flex items-center justify-center font-semibold text-sm">
          2
        </div>

        <Truck
          size={20}
          strokeWidth={1.75}
          className="text-stone-700"
        />

        <div>
          <h2 className="font-semibold text-lg text-stone-900">
            Delivery Options
          </h2>

          <p className="text-sm text-stone-500">
            Choose a delivery option
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

        {options.map(
          ({
            id,
            icon: Icon,
            title,
            price,
            lines,
          }) => {
            const isActive =
              selected === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  setPaymentMethod(id)
                }
                className={`text-left border rounded-xl p-4 transition-colors ${
                  isActive
                    ? "border-[#3C2E22] bg-[#FBF6EE]"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`h-4 w-4 mt-1 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isActive
                        ? "border-[#3C2E22]"
                        : "border-stone-300"
                    }`}
                  >
                    {isActive && (
                      <div className="h-2 w-2 rounded-full bg-[#3C2E22]" />
                    )}
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between gap-2 mb-1">

                      <span className="flex items-center gap-2 font-semibold text-stone-900">
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                        />
                        {title}
                      </span>

                      <span className="text-sm font-medium text-stone-600">
                        {price}
                      </span>

                    </div>

                    {lines.map((line) => (
                      <p
                        key={line}
                        className="text-xs text-stone-500 leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}

                  </div>

                </div>

              </button>
            );
          }
        )}

      </div>

      <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3.5">

        <ShieldCheck
          size={18}
          strokeWidth={1.75}
          className="text-[#3C2E22] shrink-0"
        />

        <p className="text-sm text-stone-700">
          Your order will be delivered safely
          to your address.
        </p>

      </div>

    </section>
  );
}