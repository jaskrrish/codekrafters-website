

"use client";
import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";
import Image from "next/image";
import EventSection from "@/components/Events";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import TeamSection from "@/components/team-section";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <main className="min-h-screen bg-background" style={{ scrollSnapType: "y mandatory" }}>
      <Navbar />
      <div id="home" className="h-[110vh] w-full relative overflow-hidden" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/ck-core.jpg"
            alt="CK Group"
            className="object-cover w-full h-full sm:block hidden"
            fill
            priority
          />
          <Image
            src="/ck-mob.png"
            alt="CK Group Mobile"
            className="object-cover w-full h-full block sm:hidden"
            fill
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </div>
       <div id="story" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <StoryComponent />
      </div>
      <div id="events" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <EventSection />
      </div>
      <div id="sponsors" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <SponsorsComponent />
      </div>
      <div id="contact" style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}>
        <Footer />
      </div>
    </main>
  );
}
