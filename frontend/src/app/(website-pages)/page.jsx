import React from "react";
import Container from "@/components/website/ui/Container";

import Buget from "@/components/website/home/Buget";
import CategoryGrid from "@/components/website/home/CategoryGrid";
import Heroslider from "@/components/website/home/Heroslider";
import NewArrivals from "@/components/website/home/NewArrivals";
import NewsletterBanner from "@/components/website/home/NewsletterBanner";
import OurCraft from "@/components/website/home/OurCraft";
import Seller from "@/components/website/home/Seller";
import ShopByRoom from "@/components/website/home/ShopByRoom";
import Testimonials from "@/components/website/home/Testimonials";

export default function Page() {
  return (
    <>
      <Heroslider />

      <Container>
        <CategoryGrid />
        <Seller />
        <NewArrivals />
        <ShopByRoom />
        <OurCraft />
        <Testimonials />
        <Buget />
        <NewsletterBanner />
      </Container>
    </>
  );
}