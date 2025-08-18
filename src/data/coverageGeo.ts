// Minimal placeholder GeoJSON (two polygons) to demonstrate coverage overlay.
export const coverageGeo = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "天河区", coverage2020: 0.35, coverage2024: 0.58 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [113.309, 23.149],
            [113.36, 23.149],
            [113.36, 23.105],
            [113.309, 23.105],
            [113.309, 23.149],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "越秀区", coverage2020: 0.42, coverage2024: 0.64 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [113.265, 23.145],
            [113.302, 23.145],
            [113.302, 23.115],
            [113.265, 23.115],
            [113.265, 23.145],
          ],
        ],
      },
    },
  ],
} as const;








