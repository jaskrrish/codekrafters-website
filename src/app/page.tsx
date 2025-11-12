"use client";

import { Navbar } from "@/components/navbar";
import Hero from "@/components/hero";
import StoryComponent from "@/components/Story";
import EventSection from "@/components/Events";
import SponsorsComponent from "@/components/sponsor";
import Footer from "@/components/Footer";
import PresidentIntro from "@/components/President";
import TeamComponent from "@/components/Team";
import DomainsSection from "@/components/Domains";

export default function Home() {
  return (
    <main className="min-h-screen bg-background" style={{ scrollSnapType: "y mandatory" }}>
      <Navbar />
      <Hero />

      <div id="story">
        <StoryComponent />
      </div>

      <div id="domains">
        <DomainsSection />
      </div>

      <div id="events">
        <EventSection />
      </div>

      <div id="president">
        <PresidentIntro />
      </div>

      <div id="team">
        <TeamComponent />
      </div>

      <div id="sponsors">
        <SponsorsComponent />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </main>
  );
}
