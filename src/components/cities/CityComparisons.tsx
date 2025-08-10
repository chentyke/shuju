"use client";

import { Section } from "@/components/common/Section";
import { cityPolicies } from "@/data/cityPolicies";

export function CityComparisons() {
  return (
    <Section id="cities" title="他城经验与治理趋势">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cityPolicies.map((c) => (
          <div key={c.city} className="rounded-xl border p-5 bg-white/60 dark:bg-white/5">
            <div className="text-lg font-semibold">{c.city}</div>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {c.measures.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-neutral-500">{c.note}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}


