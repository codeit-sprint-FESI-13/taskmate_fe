import { HomeCTASection } from "@/widgets/landing/HomeCTASection";
import { HomeFeaturesSection } from "@/widgets/landing/HomeFeaturesSection";
import { HomeHeroSection } from "@/widgets/landing/HomeHeroSection";
import { HomeStepsSection } from "@/widgets/landing/HomeStepsSection";
import { HomeTeamSpacesSection } from "@/widgets/landing/HomeTeamSpacesSection";

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
