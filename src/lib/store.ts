"use client";

import { create } from "zustand";

export type PopulationGroup = "all" | "riders" | "seniors" | "commuters";

type AppState = {
  selectedYear: number;
  minYear: number;
  maxYear: number;
  activeGroup: PopulationGroup;
  setYear: (year: number) => void;
  setGroup: (group: PopulationGroup) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  selectedYear: 2024,
  minYear: 2010,
  maxYear: 2024,
  activeGroup: "all",
  setYear: (year: number) => {
    const { minYear, maxYear } = get();
    const clamped = Math.max(minYear, Math.min(maxYear, year));
    set({ selectedYear: clamped });
  },
  setGroup: (group: PopulationGroup) => set({ activeGroup: group }),
}));









