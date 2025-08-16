import { Hero } from "@/components/hero/Hero";
import { DailyTripsSection } from "@/components/trips/DailyTripsSection";
import { ViolationTrends } from "@/components/charts/ViolationTrends";
import { MedicalImpact } from "@/components/charts/MedicalImpact";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <DailyTripsSection />
      
      <ViolationTrends />
      <MedicalImpact />
    </div>
  );
}
