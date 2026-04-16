import { HomeCTASection } from "@/components/landing/HomeCTASection";
import { HomeFeaturesSection } from "@/components/landing/HomeFeaturesSection";
import { HomeHeroSection } from "@/components/landing/HomeHeroSection";
import { HomeStepsSection } from "@/components/landing/HomeStepsSection";
import { HomeTeamSpacesSection } from "@/components/landing/HomeTeamSpacesSection";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeFeaturesSection />
      <HomeStepsSection />
      <HomeTeamSpacesSection />
      <HomeCTASection />
    </>
  );
}
