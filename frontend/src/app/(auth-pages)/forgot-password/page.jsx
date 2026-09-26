import AuthHero from "@/components/website/login/AuthHero";
import ForgetPassword from "@/components/website/ForgetPassword/page";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F3EFE8] lg:h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:h-full lg:grid-cols-2">

        {/* Left Side */}
        <AuthHero />

        {/* Right Side */}
        <div className="flex min-h-screen flex-col items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:min-h-0 lg:px-10 lg:py-10">
          <ForgetPassword />
        </div>

      </div>
    </div>
  );
}