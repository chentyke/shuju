import { Hero } from "@/components/hero/Hero";
import { DailyTripsSection } from "@/components/trips/DailyTripsSection";
import { ViolationTrends } from "@/components/charts/ViolationTrends";
import { RiderPressure } from "@/components/people/RiderPressure";
import { RiderComments } from "@/components/people/RiderComments";
import { MedicalImpact } from "@/components/charts/MedicalImpact";
import { SpatioTemporalClustering } from "@/components/violations/SpatioTemporalClustering";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <DailyTripsSection />
      
      <ViolationTrends />
      <SpatioTemporalClustering />
      <MedicalImpact />
      <RiderPressure />
      <RiderComments />
    </div>
  );
}
