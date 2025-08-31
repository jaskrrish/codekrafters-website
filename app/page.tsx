import Hero from "@/components/Hero";
import HeroDupe from "@/components/HeroDupe";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden">
      {/* <Hero /> */}
      {/* Other sections of your website go here */}
      {<HeroDupe />}
    </main>
  );
}
