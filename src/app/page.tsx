import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";
import Image from "next/image";
import EventSection from "@/components/Events";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import TeamSection from "@/components/team-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background" style={{ 
      scrollSnapType: "y proximity", 
      scrollBehavior: "smooth" // Add smooth scrolling behavior
    }}>
      <Navbar />
      <div id="home" className="h-[110vh] w-full" style={{ scrollSnapAlign: "start" }}>
        <Image
          src="/ck-core.jpg"
          alt="CK Group"
          className="object-cover w-full h-full sm:block hidden"
          fill
        />
        <Image
          src="/ck-mob.png"
          alt="CK Group Mobile"
          className="object-cover w-full h-full block sm:hidden"
          fill
        />
      </div>
      <div id="story" className="section-transition" style={{ scrollSnapAlign: "start" }}>
        <StoryComponent />
      </div>
      
      <div id="team" className="section-transition" style={{ scrollSnapAlign: "start" }}>
        <TeamSection />
      </div>
      
      <div id="events" className="relative z-0" style={{ 
        scrollSnapAlign: "start",
        scrollMarginTop: "50px" // Add scroll margin to improve snap positioning
      }}>
        <EventSection />
      </div>
  
      <div id="sponsors" style={{ scrollSnapAlign: "start" }}>
        <SponsorsComponent />
      </div>
      <div id="contact" style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </div>
    </main>
  );
}
