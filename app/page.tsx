import About from "@/components/About";
import HeroSection from "@/components/Hero-Section";

const Page = () => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden relative">
      <HeroSection />
      <About />
    </main>
  );
};

export default Page;
