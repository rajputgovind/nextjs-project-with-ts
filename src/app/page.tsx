"use client";
import AssistanceSection from "@/components/AssistanceSection";
import ChatBox from "@/components/ChatBox";
import ChooseUsSection from "@/components/ChooseUsSection";
import DiscoverSection from "@/components/DiscoverSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";


export default function Home() {
  // const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Handler function to receive selected locations
  // const handleSearchSelection = (locations: string[]) => {
  //   setSelectedLocations(locations);
  // };
  return (
    <>
      {/* <HeroSection onSearchSelected={handleSearchSelection}  />
      <DiscoverSection selectedLocations={selectedLocations} /> */}
      <HeroSection/>
      <DiscoverSection/>
      <ChooseUsSection />
      <ProcessSection />
      <FAQSection />
      <AssistanceSection />
      <ChatBox/>
    </>
  );
}
