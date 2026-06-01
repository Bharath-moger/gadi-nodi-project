import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gadinodi",
    short_name: "Gadinodi",
    description: "Marketplace for new and used vehicles with configurable partner sections.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4fb",
    theme_color: "#4338ca",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
