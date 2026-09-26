import StoreFilters from "@/components/website/store/Storefilters";
import StoreHero from "@/components/website/store/StoreHero";
import StoreOfferBanner from "@/components/website/store/Storeofferbanner";
import StorePagination from "@/components/website/store/Storepageination";
import StoreFilterWrapper from "@/components/website/store/StoreFilterWrapper";
import Container from "@/components/website/ui/Container";
import React from "react";

export default function Layout({ children }) {
  return (
    <Container>
      {/* Hero */}
      <StoreHero />

      {/* Hero ke baad */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row items-start">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-20 self-start">
            <StoreFilters />
          </aside>

          {/* Products */}
          <main className="min-w-0 flex-1">
            <StoreFilterWrapper>
              <StoreFilters />
            </StoreFilterWrapper>

            {children}

          </main>

        </div>
      </div>
    </Container>
  );
}