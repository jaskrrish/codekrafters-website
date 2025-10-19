import TeamMemberComponent from "@/components/teamMember";
// import HeroPage from "@/components/hero";
import SponsorsComponent from "@/components/sponsor";
import StoryComponent from "@/components/Story";
import Image from "next/image";
import EventSection from "@/components/Events";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden">
      <Navbar />
      {/* <HeroPage /> */}
      {/* hero compoenent */}
      <div className="h-[110vh] w-full">
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
      <StoryComponent/>
      <EventSection />
      <TeamMemberComponent />
      <SponsorsComponent />
    </main>
  );
}
