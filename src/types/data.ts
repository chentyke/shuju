// Data types for the journalism project

export interface YearlyData {
  year: number;
  value: number;
}

export interface ModeShareData {
  year: number;
  walking: number;
  bus: number;
  metro: number;
  nonMotor: number;
}

export interface ViolationData {
  year: number;
  value: number;
}

export interface ViolationTypeData {
  name: string;
  value: number;
}

export interface RiderProfileData {
  averageAge: number;
  ordersPerDay: number;
  averageSpeedKmh: number;
  ticketRatePerMonth: number;
}

export interface ElderlyAccidentData {
  ageGroup: string;
  rate: number;
}

export interface CityPolicyData {
  city: string;
  policy: string;
  effectiveness: number;
  description: string;
}

export interface GeoFeatureProperties {
  name: string;
  coverage2020: number;
  coverage2024: number;
}

export interface ChartOptions {
  backgroundColor?: string;
  tooltip?: {
    trigger: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    textStyle?: {
      color: string;
    };
    extraCssText?: string;
  };
  legend?: {
    data?: string[];
    top?: number | string;
    textStyle?: {
      color: string;
      fontSize: number;
    };
  };
  grid?: {
    left: number | string;
    right: number | string;
    top: number | string;
    bottom: number | string;
  };
}

export type PopulationGroup = "all" | "riders" | "seniors" | "commuters";

export interface AppState {
  selectedYear: number;
  minYear: number;
  maxYear: number;
  activeGroup: PopulationGroup;
}

// Component prop types
export interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  fullScreen?: boolean;
  withBorder?: boolean;
  animated?: boolean;
  children: React.ReactNode;
}

export interface MetricProps {
  label: string;
  end: number;
  decimals?: number;
  animate?: boolean;
  icon?: string;
}

export interface LoadingProps {
  message?: string;
  className?: string;
}

export interface ChartLoadingProps {
  height?: number;
  title?: string;
}