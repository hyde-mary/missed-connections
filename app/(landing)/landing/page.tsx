import React from "react";
import LandingHeroSection from "../_Components/LandingHeroSection";

const Page = () => {
  return (
    <div>
      <main>
        <section id="hero" className="h-screen">
          <LandingHeroSection />
        </section>
        <section id="about"></section>
        <section id="services"></section>
      </main>
    </div>
  );
};

export default Page;
