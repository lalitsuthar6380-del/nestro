import { Lock } from "lucide-react";

const steps = [
  { number: 1, label: "Shipping" },
  { number: 2, label: "Review" },
  { number: 3, label: "Place Order" },
];

export default function CheckoutSteps({ activeStep = 1 }) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const isActive = step.number === activeStep;
          const isDone = step.number < activeStep;
          const isLast = i === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                    isActive || isDone
                      ? "bg-[#3C2E22] text-white"
                      : "border border-stone-300 text-stone-500 bg-white"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm whitespace-nowrap ${
                    isActive ? "font-semibold text-stone-900" : "text-stone-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && <div className="h-px w-16 sm:w-24 bg-stone-300 mx-4" />}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
          <Lock size={16} strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900 leading-tight">
            Secure Checkout
          </p>
          <p className="text-xs text-stone-500">Your information is safe with us.</p>
        </div>
      </div>
    </div>
  );
}