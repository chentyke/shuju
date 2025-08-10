import { Hero } from "@/components/hero/Hero";
import { GrowthTrends } from "@/components/charts/GrowthTrends";
import { CoverageMap } from "@/components/maps/CoverageMap";
import { Violations } from "@/components/charts/Violations";
import { HotspotHeatmap } from "@/components/maps/HotspotHeatmap";
import { RiderAndSenior } from "@/components/people/RiderAndSenior";
import { CausalAndGauge } from "@/components/causal/CausalAndGauge";
import { CityComparisons } from "@/components/cities/CityComparisons";
import { Ending } from "@/components/footer/Ending";

export default function Home() {
  return (
    <div className="font-sans snap-y-container">
      <Hero />
      <GrowthTrends />
      <CoverageMap />
      <Violations />
      <HotspotHeatmap />
      <RiderAndSenior />
      <CausalAndGauge />
      <CityComparisons />
      <Ending />
    </div>
  );
}
