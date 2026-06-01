import type { VehicleCondition } from "../src/common/catalog.constants";

type SparePartSeedRow = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  partNumber: string | null;
  condition: VehicleCondition;
  price: number;
  location: string;
  sellerName: string;
  sellerType: string;
  compatibility: string;
  description: string;
  summary: string;
  warranty: string | null;
  features: string[];
  heroTone: string;
};

export const sparePartsSeed: SparePartSeedRow[] = [
  {
    slug: "brembo-front-brake-pads-maruti-swift",
    title: "Brembo front brake pad set",
    subtitle: "Low-dust compound — pair for front axle",
    category: "Brakes & steering",
    partNumber: "P85077",
    condition: "New",
    price: 6890,
    location: "Bengaluru",
    sellerName: "South City Auto Parts",
    sellerType: "Garage",
    compatibility: "Maruti Swift / Dzire (2018–2024), petrol & diesel",
    description:
      "Genuine-spec friction material with shims and hardware kit. Ideal for urban stop-go traffic. Seller verifies batch codes on dispatch.",
    summary: "Front brake pads for Swift family — Brembo aftermarket line with hardware.",
    warranty: "12 months manufacturer defect coverage",
    features: [
      "Includes anti-squeal shims",
      "ECE R90 class equivalent",
      "Same-day dispatch in Bengaluru metro",
    ],
    heroTone: "linear-gradient(135deg, #1e1b4b, #4338ca)",
  },
  {
    slug: "mahindra-scorpio-n-clutch-kit",
    title: "Mahindra Scorpio N clutch kit",
    subtitle: "Pressure plate + disc + release bearing",
    category: "Engine & drivetrain",
    partNumber: "OEM-REF-CK-SCN",
    condition: "New",
    price: 28400,
    location: "Pune",
    sellerName: "Deccan Drivetrain Co.",
    sellerType: "Independent dealer",
    compatibility: "Mahindra Scorpio N mHawk 2.2 (2022+), manual transmission",
    description:
      "Complete clutch assembly for scheduled replacement or towing-heavy use. Core return optional — ask seller before purchase.",
    summary: "OEM-grade clutch kit for Scorpio N manuals — sold as a matched set.",
    warranty: "6 months / 10,000 km (whichever first)",
    features: ["Matched pressure plate & disc", "SKF or equivalent release bearing", "Workshop fitment support"],
    heroTone: "linear-gradient(135deg, #312e81, #6366f1)",
  },
  {
    slug: "bosch-air-filter-hyundai-creta",
    title: "Bosch air filter insert",
    subtitle: "Panel filter — petrol variants",
    category: "Filters & service",
    partNumber: "F 026 400 523",
    condition: "New",
    price: 920,
    location: "Hyderabad",
    sellerName: "Hitech Filters & Fluids",
    sellerType: "Garage",
    compatibility: "Hyundai Creta 1.5 MPi (2020–2024)",
    description:
      "Drop-in panel filter for routine service intervals. Bulk packs available for fleet buyers — message seller.",
    summary: "Bosch panel air filter for Hyundai Creta petrol.",
    warranty: "Standard Bosch consumer warranty",
    features: ["ISO-tested media", "Sealed retail pack", "Next-day courier to TS/AP"],
    heroTone: "linear-gradient(135deg, #0f172a, #0d9488)",
  },
  {
    slug: "philips-h4-led-upgrade-kit",
    title: "Philips Ultinon H4 LED pair",
    subtitle: "Street-legal beam pattern — 6000K",
    category: "Electrical & lighting",
    partNumber: "11342U",
    condition: "New",
    price: 11200,
    location: "Mumbai",
    sellerName: "Western Auto Lighting",
    sellerType: "Car Showroom",
    compatibility: "H4 reflector headlamps (check dust cap depth before fitment)",
    description:
      "Fan-cooled LED upgrade with CAN-bus adapters for common Indian hatchbacks. Professional alignment recommended after install.",
    summary: "Philips H4 LED upgrade kit with adapters for reflector lamps.",
    warranty: "2 years Philips India",
    features: ["CAN-bus friendly on most BCMs", "Compact driver", "Installation guide PDF"],
    heroTone: "linear-gradient(135deg, #4c1d95, #7c3aed)",
  },
  {
    slug: "monroe-rear-shock-absorbers-ertiga",
    title: "Monroe OESpectrum rear shocks (pair)",
    subtitle: "Gas-charged — ride comfort bias",
    category: "Suspension",
    partNumber: "376195SP",
    condition: "New",
    price: 7650,
    location: "Chennai",
    sellerName: "Anna Salai Suspension Works",
    sellerType: "Garage",
    compatibility: "Maruti Ertiga second & third generation (2018+)",
    description:
      "Rear axle pair for replacing tired dampers. Seller stocks mounting bushes separately if needed.",
    summary: "Monroe rear shock absorbers for Maruti Ertiga — pair.",
    warranty: "18 months against manufacturing defects",
    features: ["Twin-tube gas design", "Nitrocarburised rod", "Pair sold together"],
    heroTone: "linear-gradient(135deg, #14532d, #166534)",
  },
  {
    slug: "used-bmw-f30-wing-mirror-left",
    title: "BMW 3 Series (F30) left mirror assembly",
    subtitle: "Used — power fold, heated glass",
    category: "Body & glass",
    partNumber: null,
    condition: "Used",
    price: 14500,
    location: "Delhi NCR",
    sellerName: "NCR Euro Salvage",
    sellerType: "Individual dealer",
    compatibility: "BMW F30 / F31 LCI and pre-LCI (verify 5-pin vs 8-pin plug)",
    description:
      "Removed from insurance write-off; glass intact, motor tested. Photos of connector pinout available on request.",
    summary: "Used OEM-style left wing mirror for BMW F30 — tested motor.",
    warranty: "7-day DOA replacement only",
    features: ["Paint code Mineral grey B39", "Motor cycle-tested", "Courier insured"],
    heroTone: "linear-gradient(135deg, #292524, #57534e)",
  },
  {
    slug: "michelin-primacy-suv-225-60-r17",
    title: "Michelin Primacy SUV+ 225/60 R17",
    subtitle: "Single tyre — DOT 2025",
    category: "Tyres & wheels",
    partNumber: "225/60R17 99V",
    condition: "New",
    price: 11899,
    location: "Ahmedabad",
    sellerName: "Riverfront Tyre Point",
    sellerType: "Garage",
    compatibility: "Compact SUVs with 225/60 R17 OE or approved stagger",
    description:
      "Fresh stock with warranty registration QR. Mounting & balancing available at partner workshops in Ahmedabad.",
    summary: "Michelin Primacy SUV+ single tyre — current DOT.",
    warranty: "5 years Michelin India tread warranty (terms apply)",
    features: ["Registration QR on sidewall", "Free rotation at seller shop (1 year)", "Pressure sensors extra"],
    heroTone: "linear-gradient(135deg, #1e3a5f, #0ea5e9)",
  },
  {
    slug: "castrol-magnatec-5w30-4l",
    title: "Castrol MAGNATEC 5W-30 (4 L)",
    subtitle: "Synthetic blend — API SP / ILSAC GF-6",
    category: "Filters & service",
    partNumber: "159B9A",
    condition: "New",
    price: 2890,
    location: "Kochi",
    sellerName: "Coastal Lubricants",
    sellerType: "Garage",
    compatibility: "Petrol engines calling for 5W-30 GF-6 (check owner manual)",
    description:
      "Sealed 4 L pack suitable for frequent cold starts. Seller provides batch sticker for warranty claims.",
    summary: "Castrol MAGNATEC 5W-30 synthetic blend — 4 litre pack.",
    warranty: "As per Castrol India pack policy",
    features: ["Hologram verified pack", "Cold-start wear protection", "Bulk pricing for fleets"],
    heroTone: "linear-gradient(135deg, #713f12, #ca8a04)",
  },
];
