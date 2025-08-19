import { Hero } from "@/components/hero/Hero";
import { DailyTripsSection } from "@/components/trips/DailyTripsSection";
import { ViolationTrends } from "@/components/charts/ViolationTrends";
import { RiderPressure } from "@/components/people/RiderPressure";
import { RiderComments } from "@/components/people/RiderComments";
import { MedicalImpact } from "@/components/charts/MedicalImpact";
import { SpatioTemporalClustering } from "@/components/violations/SpatioTemporalClustering";
import { CausalAnalysis } from "@/components/analysis/CausalAnalysis";
import { BestPractices } from "@/components/reference/BestPractices";
import { Footer } from "@/components/footer/Footer";

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
      <CausalAnalysis />
      <BestPractices />
      <Footer />
    </div>
  );
}
