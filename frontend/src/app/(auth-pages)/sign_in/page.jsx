import AuthHero from "@/components/website/login/AuthHero";
import LoginForm from "@/components/website/login/loginForm";
import TrustBadges from "@/components/website/login/TrustBadges";

export default function SigninPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F3EFE8] lg:h-screen">
      <div className="grid min-h-screen grid-cols-1 lg:h-full lg:grid-cols-2">
        <AuthHero />

        <div className="flex min-h-screen flex-col items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:min-h-0 lg:px-10 lg:py-10">
          <LoginForm />
          {/* <TrustBadges /> */}
        </div>
      </div>
    </div>
  );
}