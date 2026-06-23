import type { MarketStat, PartnerType, VehicleListing } from "../src/common/types";

export const vehicleConditions = ["New", "Used"] as const;

export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"] as const;

export const transmissionTypes = ["Automatic", "Manual"] as const;

export const marketStats: MarketStat[] = [
  { label: "Active listings", value: "12,500+" },
  { label: "Verified sellers", value: "740+" },
  { label: "Cities covered", value: "120" },
  { label: "Financing partners", value: "18" },
];

// Add more partner types here to extend the marketplace user sections.
export const partnerTypes: PartnerType[] = [
  {
    slug: "garages",
    name: "Garages",
    shortLabel: "Garages",
    badge: "Core partner",
    description:
      "Service-led garages can list certified used vehicles, promote workshop bundles, and capture after-sales revenue inside one storefront.",
    audience: "Workshop operators and service centers",
    highlights: [
      "Post service history and inspection confidence notes",
      "Bundle warranty, maintenance, and roadside coverage",
      "Prioritize repeat buyers from the logged-in mode",
    ],
    metrics: [
      { label: "Avg. lead response", value: "< 18 mins" },
      { label: "Workshop upsell rate", value: "22%" },
      { label: "Inspection SLA", value: "24 hrs" },
    ],
    ctaLabel: "Join as a garage",
  },
  {
    slug: "car-showrooms",
    name: "Car Showrooms",
    shortLabel: "Showrooms",
    badge: "Core partner",
    description:
      "Multi-brand and franchise showrooms can run launch campaigns, rotate new inventory, and showcase premium merchandising blocks.",
    audience: "Retail showrooms and dealership groups",
    highlights: [
      "Highlight launch stock with rich merchandising",
      "Assign showroom consultants to logged-in buyers",
      "Promote finance, exchange, and delivery bundles",
    ],
    metrics: [
      { label: "New model launch CTR", value: "8.4%" },
      { label: "Conversion uplift", value: "31%" },
      { label: "Inventory sync cadence", value: "Hourly" },
    ],
    ctaLabel: "List showroom inventory",
  },
  {
    slug: "individual-dealers",
    name: "Individual Dealers",
    shortLabel: "Dealers",
    badge: "Core partner",
    description:
      "Independent dealers get an enterprise-grade listing workflow, lead routing, pricing guidance, and trust-building verification blocks.",
    audience: "Independent vehicle sellers",
    highlights: [
      "Manage pricing bands with market comparison hints",
      "Use logged-in mode to capture shortlisted buyers",
      "Add delivery zones, warranty, and documentation support",
    ],
    metrics: [
      { label: "Price match coverage", value: "92%" },
      { label: "Repeat buyer share", value: "19%" },
      { label: "Lead qualification", value: "Automated" },
    ],
    ctaLabel: "Start selling",
  },
  {
    slug: "fleet-sellers",
    name: "Fleet Sellers",
    shortLabel: "Fleet",
    badge: "Expansion type",
    description:
      "Corporate fleet sellers can dispose vehicles in batches with bulk pricing, compliance notes, and B2B-ready remarketing flows.",
    audience: "Corporate mobility and fleet operators",
    highlights: [
      "Bulk inventory uploads and tender-ready exports",
      "Control account teams per city or region",
      "Serve both retail and trade buyers",
    ],
    metrics: [
      { label: "Bulk upload size", value: "1,000+" },
      { label: "Average remarketing cycle", value: "9 days" },
      { label: "B2B buyer network", value: "280+" },
    ],
    ctaLabel: "Launch fleet channel",
  },
  {
    slug: "rental-partners",
    name: "Rental Partners",
    shortLabel: "Rental",
    badge: "Expansion type",
    description:
      "Rental companies can move de-fleeted vehicles faster while advertising service plans and subscription-style ownership options.",
    audience: "Rental and subscription mobility partners",
    highlights: [
      "Surface subscription hand-off opportunities",
      "Show vehicle utilization and maintenance history",
      "Promote seasonal disposal events",
    ],
    metrics: [
      { label: "De-fleet turnaround", value: "14 days" },
      { label: "Inspection completion", value: "96%" },
      { label: "Subscription cross-sell", value: "12%" },
    ],
    ctaLabel: "Create rental storefront",
  },
  {
    slug: "ev-specialists",
    name: "EV Specialists",
    shortLabel: "EV",
    badge: "Expansion type",
    description:
      "Electric mobility experts can combine range validation, charging ecosystem details, and battery assurance into each listing.",
    audience: "EV-first dealers and conversion experts",
    highlights: [
      "Show battery health and charging compatibility",
      "Publish charger bundles and onboarding sessions",
      "Route service packages to EV-certified garages",
    ],
    metrics: [
      { label: "Battery report attachment", value: "100%" },
      { label: "Charging partner network", value: "42" },
      { label: "Average upsell uplift", value: "17%" },
    ],
    ctaLabel: "Open EV channel",
  },
];

export const vehicles: VehicleListing[] = [
  {
    id: "v1",
    slug: "mahindra-scorpio-n-z8-2025",
    title: "Mahindra Scorpio-N Z8",
    subtitle: "New SUV with ADAS, captain seats, and connected drive tech",
    make: "Mahindra",
    model: "Scorpio-N Z8",
    year: 2025,
    condition: "New",
    price: 2499000,
    mileage: "0 km",
    fuel: "Diesel",
    bodyStyle: "SUV",
    transmission: "Automatic",
    location: "Kolkata",
    sellerName: "Eastern Auto Hub",
    sellerType: "Car Showroom",
    description:
      "A premium family SUV set up for city comfort and long-range touring, with a dealer-backed warranty and launch benefits.",
    summary:
      "Flagship SUV inventory for buyers comparing new family-focused vehicles with finance and exchange support.",
    color: "Napoli Black",
    seats: 7,
    financeEstimate: 47200,
    rating: 4.8,
    heroTone: "linear-gradient(135deg, #0f172a, #0f766e)",
    imageUrls: ["https://i.pinimg.com/1200x/b1/34/8d/b1348d50a1e7cf2a9e863c8fa0e6ef77.jpg"],
    features: [
      "6 airbags and 360-degree camera",
      "Panoramic sunroof",
      "Wireless Android Auto and Apple CarPlay",
      "Dealer-backed 5-year extended warranty",
    ],
    specs: [
      { label: "Engine", value: "2.2L mHawk Diesel" },
      { label: "Power", value: "172 bhp" },
      { label: "Torque", value: "400 Nm" },
      { label: "Drive", value: "RWD" },
    ],
  },
  {
    id: "v2",
    slug: "maruti-baleno-alpha-2023",
    title: "Maruti Baleno Alpha",
    subtitle: "Used hatchback with full service history and city-friendly mileage",
    make: "Maruti Suzuki",
    model: "Baleno Alpha",
    year: 2023,
    condition: "Used",
    price: 745000,
    mileage: "21,800 km",
    fuel: "Petrol",
    bodyStyle: "Hatchback",
    transmission: "Manual",
    location: "Howrah",
    sellerName: "PrimeLane Garage",
    sellerType: "Garage",
    description:
      "Certified pre-owned hatchback inspected by an affiliated garage with recent tyre, brake, and suspension work completed.",
    summary:
      "Compact used hatchback for budget-focused city buyers looking for verified upkeep and low running costs.",
    color: "Nexa Blue",
    seats: 5,
    financeEstimate: 14800,
    rating: 4.6,
    heroTone: "linear-gradient(135deg, #172554, #2563eb)",
    imageUrls: ["https://i.pinimg.com/1200x/1f/b0/07/1fb007d38be2702ca6471bb55f82eaed.jpg"],
    features: [
      "360-point inspection report",
      "Rear camera and head-up display",
      "Single-owner vehicle",
      "Workshop maintenance package available",
    ],
    specs: [
      { label: "Engine", value: "1.2L DualJet Petrol" },
      { label: "Mileage", value: "22.35 km/l" },
      { label: "Ownership", value: "1st owner" },
      { label: "Registration", value: "WB" },
    ],
  },
  {
    id: "v3",
    slug: "tata-nexon-ev-empowered-2024",
    title: "Tata Nexon EV Empowered+",
    subtitle: "New electric SUV with long-range battery and charging bundle",
    make: "Tata",
    model: "Nexon EV Empowered+",
    year: 2024,
    condition: "New",
    price: 1965000,
    mileage: "0 km",
    fuel: "Electric",
    bodyStyle: "SUV",
    transmission: "Automatic",
    location: "Bhubaneswar",
    sellerName: "Volt Mobility Studio",
    sellerType: "EV Specialist",
    description:
      "EV-led merchandising with battery assurance, home charger consultation, and a routed service network for long-term ownership.",
    summary:
      "Electric SUV listing designed for EV-first shoppers needing charging and battery confidence in one place.",
    color: "Fearless Purple",
    seats: 5,
    financeEstimate: 37100,
    rating: 4.9,
    heroTone: "linear-gradient(135deg, #14532d, #22c55e)",
    imageUrls: ["https://i.pinimg.com/736x/0e/ed/7d/0eed7d0ca50cd3a8a53a09c400c28e0f.jpg"],
    features: [
      "465 km MIDC range",
      "Battery health assurance plan",
      "DC fast charging support",
      "Complimentary charger installation consult",
    ],
    specs: [
      { label: "Battery", value: "46.08 kWh" },
      { label: "Range", value: "465 km" },
      { label: "Fast charge", value: "56 min (10-80%)" },
      { label: "Warranty", value: "8 years / 1.6 lakh km" },
    ],
  },
  {
    id: "v4",
    slug: "toyota-innova-crysta-gx-2022",
    title: "Toyota Innova Crysta GX",
    subtitle: "Used people mover with business-class comfort and verified papers",
    make: "Toyota",
    model: "Innova Crysta GX",
    year: 2022,
    condition: "New",
    price: 1890000,
    mileage: "38,400 km",
    fuel: "Diesel",
    bodyStyle: "MUV",
    transmission: "Manual",
    location: "Patna",
    sellerName: "Metro Fleet Exchange",
    sellerType: "Fleet Seller",
    description:
      "A fleet-maintained MPV with complete compliance records, ideal for commercial use or large-family transfers.",
    summary:
      "Reliable used MPV for buyers needing spacious travel, fleet-grade maintenance records, and flexible ownership profiles.",
    color: "Super White",
    seats: 7,
    financeEstimate: 35600,
    rating: 4.5,
    heroTone: "linear-gradient(135deg, #3f3f46, #0f766e)",
    imageUrls: ["https://i.pinimg.com/1200x/d5/b0/69/d5b069cb7ff31b6cc9261537ad5c4ecb.jpg"],
    features: [
      "Documented fleet maintenance history",
      "Captain-seat conversion ready",
      "Commercial and private transfer support",
      "Extended service contract available",
    ],
    specs: [
      { label: "Engine", value: "2.4L Diesel" },
      { label: "Power", value: "148 bhp" },
      { label: "Ownership", value: "Fleet managed" },
      { label: "Insurance", value: "Comprehensive active" },
    ],
  },
  {
    id: "v5",
    slug: "hyundai-verna-sx-turbo-2024",
    title: "Hyundai Verna SX Turbo",
    subtitle: "New sedan for premium daily driving with launch finance offers",
    make: "Hyundai",
    model: "Verna SX Turbo",
    year: 2024,
    condition: "New",
    price: 1750000,
    mileage: "0 km",
    fuel: "Petrol",
    bodyStyle: "Sedan",
    transmission: "Automatic",
    location: "Siliguri",
    sellerName: "Summit Hyundai Gallery",
    sellerType: "Car Showroom",
    description:
      "A high-feature premium sedan merchandised for performance-focused buyers who want connectivity, comfort, and showroom-backed aftercare.",
    summary:
      "Premium sedan launch stock with strong showroom merchandising and finance-led conversion hooks.",
    color: "Titan Grey",
    seats: 5,
    financeEstimate: 32900,
    rating: 4.7,
    heroTone: "linear-gradient(135deg, #4c1d95, #2563eb)",
    imageUrls: ["https://images.unsplash.com/photo-1629005559534-e71542e2a24a?auto=format&fit=crop&w=1600&h=900&q=80"],
    features: [
      "Turbo petrol powertrain",
      "Dual-screen cockpit",
      "ADAS package",
      "Exchange and loyalty bonus support",
    ],
    specs: [
      { label: "Engine", value: "1.5L Turbo GDi" },
      { label: "Power", value: "158 bhp" },
      { label: "Torque", value: "253 Nm" },
      { label: "Sunroof", value: "Smart electric" },
    ],
  },
  {
    id: "v6",
    slug: "royal-enfield-hunter-350-2023",
    title: "Royal Enfield Hunter 350",
    subtitle: "Used bike with low kilometers and commuter-friendly ergonomics",
    make: "Royal Enfield",
    model: "Hunter 350",
    year: 2023,
    condition: "Used",
    price: 149000,
    mileage: "8,900 km",
    fuel: "Petrol",
    bodyStyle: "Motorcycle",
    transmission: "Manual",
    location: "Durgapur",
    sellerName: "Rider's Loop Dealer",
    sellerType: "Individual Dealer",
    description:
      "A clean urban motorcycle listing positioned for young buyers with accessories, paperwork support, and low running hours.",
    summary:
      "Affordable used bike inventory for urban commuters who want a verified seller and simple documentation flow.",
    color: "Rebel Blue",
    seats: 2,
    financeEstimate: 3100,
    rating: 4.4,
    heroTone: "linear-gradient(135deg, #7c2d12, #ea580c)",
    imageUrls: ["https://i.pinimg.com/736x/77/64/74/776474ce7ce2fd3db83c1d71e0afcc93.jpg"],
    features: [
      "Service records included",
      "Accessory pack available",
      "Single-owner profile",
      "Instant RC transfer support",
    ],
    specs: [
      { label: "Engine", value: "349 cc" },
      { label: "Mileage", value: "36 km/l" },
      { label: "ABS", value: "Dual-channel" },
      { label: "Ownership", value: "1st owner" },
    ],
  },
  {
    id: "v7",
    slug: "isuzu-d-max-v-cross-2022",
    title: "Isuzu D-Max V-Cross",
    subtitle: "Used pickup for utility buyers with verified accessories and canopy",
    make: "Isuzu",
    model: "D-Max V-Cross",
    year: 2022,
    condition: "New",
    price: 2125000,
    mileage: "29,100 km",
    fuel: "Diesel",
    bodyStyle: "Pickup",
    transmission: "Automatic",
    location: "Ranchi",
    sellerName: "Terrain Motors",
    sellerType: "Individual Dealer",
    description:
      "Utility-focused pickup listing for mixed personal and commercial usage, backed by inspection notes and accessory disclosures.",
    summary:
      "Versatile pickup inventory for rugged buyers who need accessories, payload confidence, and verified disclosures.",
    color: "Splash White",
    seats: 5,
    financeEstimate: 40200,
    rating: 4.5,
    heroTone: "linear-gradient(135deg, #292524, #b45309)",
    imageUrls: ["https://images.unsplash.com/photo-1719891652597-b76354270790?auto=format&fit=crop&w=1600&h=900&q=80"],
    features: [
      "Canopy and bedliner included",
      "Off-road ready tyres",
      "Inspection-backed suspension check",
      "Road trip accessories bundled",
    ],
    specs: [
      { label: "Engine", value: "1.9L Diesel" },
      { label: "Drive", value: "4x4" },
      { label: "Payload", value: "265 kg" },
      { label: "Ownership", value: "2nd owner" },
    ],
  },
  {
    id: "v8",
    slug: "kia-sonet-htx-cng-2024",
    title: "Kia Sonet HTX CNG",
    subtitle: "New compact SUV configured for efficient urban and intercity use",
    make: "Kia",
    model: "Sonet HTX",
    year: 2024,
    condition: "New",
    price: 1325000,
    mileage: "0 km",
    fuel: "CNG",
    bodyStyle: "SUV",
    transmission: "Manual",
    location: "Guwahati",
    sellerName: "NorthEast Mobility House",
    sellerType: "Car Showroom",
    description:
      "Compact SUV positioned for value-sensitive buyers who want showroom trust, fuel efficiency, and urban practicality.",
    summary:
      "Compact new SUV stock for buyers balancing low running cost with a feature-rich showroom experience.",
    color: "Imperial Blue",
    seats: 5,
    financeEstimate: 24900,
    rating: 4.6,
    heroTone: "linear-gradient(135deg, #083344, #0891b2)",
    imageUrls: ["https://images.unsplash.com/photo-1769058321750-133d75b630e8?auto=format&fit=crop&w=1600&h=900&q=80"],
    features: [
      "Dual-fuel efficiency proposition",
      "Connected infotainment",
      "Extended warranty package",
      "Test-drive scheduling across zones",
    ],
    specs: [
      { label: "Fuel setup", value: "Factory-fitted CNG" },
      { label: "Mileage", value: "26+ km/kg" },
      { label: "Boot", value: "Flexible split floor" },
      { label: "Warranty", value: "3 years standard" },
    ],
  },
  {
    id: "v9",
    slug: "firefox-raptor-city-bicycle-2024",
    title: "Firefox Raptor City",
    subtitle: "Lightweight commuter bicycle with disc brakes and rack",
    make: "Firefox",
    model: "Raptor City",
    year: 2024,
    condition: "New",
    price: 18990,
    mileage: "N/A",
    fuel: "Other",
    bodyStyle: "Bicycle",
    transmission: "Manual",
    location: "Pune",
    sellerName: "Urban Cycle Works",
    sellerType: "Individual Dealer",
    description:
      "Hydraulic disc brakes, alloy frame, and commuter ergonomics—ideal for short city hops and weekend rides.",
    summary: "Human-powered mobility with transparent specs for urban riders.",
    color: "Matte Black",
    seats: 1,
    financeEstimate: 450,
    rating: 4.5,
    heroTone: "linear-gradient(135deg, #14532d, #166534)",
    imageUrls: ["https://i.pinimg.com/1200x/b6/64/fa/b664faed229d6370b7d98cc27f553630.jpg"],
    features: ["Front suspension fork", "Included mudguards", "Size-fit guidance"],
    specs: [
      { label: "Frame", value: "6061 Alloy" },
      { label: "Brakes", value: "Mechanical disc" },
      { label: "Speeds", value: "21-speed" },
      { label: "Weight", value: "~14 kg" },
    ],
  },
  {
    id: "v10",
    slug: "honda-activa-6g-2023",
    title: "Honda Activa 6G DLX",
    subtitle: "Low-mileage scooter with CBS and LED lighting",
    make: "Honda",
    model: "Activa 6G DLX",
    year: 2023,
    condition: "Used",
    price: 78500,
    mileage: "11,200 km",
    fuel: "Petrol",
    bodyStyle: "Scooter",
    transmission: "Automatic",
    location: "Indore",
    sellerName: "CityTwo Motors",
    sellerType: "Garage",
    description:
      "India’s favourite scooter profile—easy parking, strong resale, and hassle-free city commuting.",
    summary: "Affordable used scooter stock with verified odometer and recent service.",
    color: "Pearl Igneous Black",
    seats: 2,
    financeEstimate: 1650,
    rating: 4.6,
    heroTone: "linear-gradient(135deg, #1e3a5f, #0ea5e9)",
    imageUrls: ["https://i.pinimg.com/1200x/a3/55/23/a35523318ee738e7b66402122f25e6d7.jpg"],
    features: ["Combined braking system", "Digital meter", "Recent belt service"],
    specs: [
      { label: "Engine", value: "109.51 cc" },
      { label: "Mileage", value: "~48 km/l" },
      { label: "Ownership", value: "1st owner" },
      { label: "Insurance", value: "Third-party active" },
    ],
  },
  {
    id: "v11",
    slug: "tata-signa-2823-tipper-2020",
    title: "Tata Signa 2823.T BS6",
    subtitle: "Heavy-duty tipper for aggregates and construction haulage",
    make: "Tata",
    model: "Signa 2823.T",
    year: 2020,
    condition: "Used",
    price: 3850000,
    mileage: "1,42,000 km",
    fuel: "Diesel",
    bodyStyle: "Tipper",
    transmission: "Manual",
    location: "Raipur",
    sellerName: "Mineral Haul Partners",
    sellerType: "Fleet Seller",
    description:
      "GVW-rated tipper with documented maintenance, ideal for quarry and road-building contractors.",
    summary: "Commercial tipper listing with fleet-grade paperwork and payload clarity.",
    color: "Construction Yellow",
    seats: 3,
    financeEstimate: 92000,
    rating: 4.3,
    heroTone: "linear-gradient(135deg, #713f12, #ca8a04)",
    imageUrls: ["https://i.pinimg.com/736x/38/7c/4e/387c4eadc0505ecd6f9bb1e847420c06.jpg"],
    features: ["Rock body condition report", "Fitness valid", "Hydraulic hoist inspection"],
    specs: [
      { label: "GVW", value: "28,000 kg" },
      { label: "Engine", value: "Cummins BS6" },
      { label: "Payload", value: "Site dependent" },
      { label: "Axle", value: "6x4" },
    ],
  },
  {
    id: "v12",
    slug: "jcb-3dx-super-excavator-2019",
    title: "JCB 3DX Super (Backhoe Loader)",
    subtitle: "Versatile loader-excavator for earthworks and utilities",
    make: "JCB",
    model: "3DX Super",
    year: 2019,
    condition: "Used",
    price: 2850000,
    mileage: "4,850 hrs",
    fuel: "Diesel",
    bodyStyle: "Excavator",
    transmission: "Manual",
    location: "Nagpur",
    sellerName: "Terrain Plant Hire",
    sellerType: "Fleet Seller",
    description:
      "Single-owner fleet unit with service records—excavator end plus loader bucket for tight sites.",
    summary: "Construction equipment listing with hour-meter transparency and finance-ready disclosure.",
    color: "JCB Yellow",
    seats: 1,
    financeEstimate: 68000,
    rating: 4.4,
    heroTone: "linear-gradient(135deg, #422006, #ea580c)",
    imageUrls: ["https://i.pinimg.com/1200x/21/a7/e7/21a7e779230b868ffabe01ce3f3deb59.jpg"],
    features: ["Joystick controls", "Auxiliary hydraulics ready", "Major services logged"],
    specs: [
      { label: "Engine", value: "76 hp Diesel" },
      { label: "Loader capacity", value: "1.1 m³" },
      { label: "Dig depth", value: "4.77 m" },
      { label: "Hours", value: "Verified meter" },
    ],
  },
  {
    id: "v13",
    slug: "hero-sprint-pro-mtb-2024",
    title: "Hero Sprint Pro MTB",
    subtitle: "Adventure-ready mountain bike with durable steel frame",
    make: "Hero",
    model: "Sprint Pro",
    year: 2024,
    condition: "New",
    price: 15999,
    mileage: "N/A",
    fuel: "Other",
    bodyStyle: "Bicycle",
    transmission: "Manual",
    location: "Bengaluru",
    sellerName: "Cycle Hub",
    sellerType: "Individual Dealer",
    description:
      "Designed for trails and city roads with front suspension and multi-speed gearing.",
    summary: "Affordable mountain bike for fitness and weekend adventures.",
    color: "Red & Black",
    seats: 1,
    financeEstimate: 380,
    rating: 4.4,
    heroTone: "linear-gradient(135deg, #dc2626, #991b1b)",
    imageUrls: ["https://i.pinimg.com/736x/17/ff/7b/17ff7b8c9a741bf64c5f708b3afd265a.jpg"],
    features: ["Front suspension", "21-speed gear system", "All-terrain tires"],
    specs: [
      { label: "Frame", value: "High-tensile Steel" },
      { label: "Brakes", value: "Disc Brakes" },
      { label: "Speeds", value: "21-speed" },
      { label: "Weight", value: "~15 kg" },
    ],
  },
  {
  id: "v14",
  slug: "trek-marlin-5-gen-3",
  title: "Trek Marlin 5 Gen 3",
  subtitle: "Trail-ready hardtail mountain bike",
  make: "Trek",
  model: "Marlin 5 Gen 3",
  year: 2025,
  condition: "New",
  price: 58199,
  mileage: "N/A",
  fuel: "Other",
  bodyStyle: "Bicycle",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Trek Bicycle Store",
  sellerType: "Authorized Dealer",
  description:
    "Trail-worthy mountain bike with aluminum frame, Shimano CUES drivetrain and hydraulic disc brakes.",
  summary: "Popular entry-level MTB from Trek.",
  color: "Fury Red",
  seats: 1,
  financeEstimate: 1400,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #dc2626, #991b1b)",
  imageUrls: [
    "https://i.pinimg.com/1200x/76/fa/0a/76fa0ac486f0c4368453e2e6d9255259.jpg"
  ],
  features: [
    "Hydraulic disc brakes",
    "Internal cable routing",
    "Shimano CUES 9-speed"
  ],
  specs: [
    { label: "Frame", value: "Alpha Silver Aluminum" },
    { label: "Fork", value: "SR Suntour XCE 28" },
    { label: "Brakes", value: "Hydraulic Disc" },
    { label: "Weight", value: "≈14.5 kg" }
  ]
},
{
  id: "v15",
  slug: "montra-madrock-27-5",
  title: "Montra Madrock 27.5",
  subtitle: "Entry-level MTB for city and trail riding",
  make: "Montra",
  model: "Madrock 27.5",
  year: 2025,
  condition: "New",
  price: 21999,
  mileage: "N/A",
  fuel: "Other",
  bodyStyle: "Bicycle",
  transmission: "Manual",
  location: "Mangalore",
  sellerName: "Cycling Boutique",
  sellerType: "Authorized Dealer",
  description:
    "Reliable mountain bike with Shimano drivetrain and mechanical disc brakes.",
  summary: "One of India's most popular budget MTBs.",
  color: "Grey Orange",
  seats: 1,
  financeEstimate: 550,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #f97316, #ea580c)",
  imageUrls: [
    "https://i.pinimg.com/1200x/8d/da/09/8dda093c3275556f9c965620d09d3f2a.jpg"
  ],
  features: [
    "27.5-inch wheels",
    "Shimano gears",
    "Double-wall alloy rims"
  ],
  specs: [
    { label: "Frame", value: "Alloy MTB Frame" },
    { label: "Brakes", value: "Mechanical Disc" },
    { label: "Speeds", value: "21-Speed" },
    { label: "Tyres", value: "27.5 x 2.35" }
  ]
},
{
  id: "v16",
  slug: "timp-peak-2-0-pro-charcoal-black-outlet",
  title: "Timp Peak 2.0 Pro",
  subtitle: "Premium full-suspension electric enduro mountain bike",
  make: "Ari Bikes",
  model: "Timp Peak 2.0 Pro",
  year: 2025,
  condition: "New",
  price: 9299,
  mileage: "N/A",
  fuel: "Electric",
  bodyStyle: "EBike",
  transmission: "Manual",
  location: "Bengaluru, Karnataka",
  sellerName: "E-MTB Hub Bengaluru",
  sellerType: "Authorized Dealer",
  description:
    "High-performance electric enduro bike featuring Bosch Performance Line CX Gen 5 motor, 800Wh battery, 170mm suspension travel, and SRAM X0 Eagle Transmission.",
  summary:
    "Carbon-frame eMTB built for aggressive trail and enduro riding.",
  color: "Charcoal Black",
  seats: 1,
  financeEstimate: 220,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #111827, #374151)",
  imageUrls: [
    "https://i.pinimg.com/1200x/bb/e5/4b/bbe54b09a389a5adf2a8ae9f48b10b9c.jpg"
  ],
  features: [
    "Bosch Performance Line CX Gen 5",
    "800Wh Bosch PowerTube battery",
    "170mm front and rear travel",
    "SRAM X0 Eagle Transmission",
    "Carbon frame"
  ],
  specs: [
    { label: "Frame", value: "CleanCast Carbon" },
    { label: "Motor", value: "Bosch Performance Line CX Gen 5" },
    { label: "Battery", value: "800Wh Bosch PowerTube" },
    { label: "Fork", value: "RockShox ZEB Ultimate RC2" },
    { label: "Rear Shock", value: "RockShox Vivid Ultimate RC2T" },
    { label: "Drivetrain", value: "SRAM X0 Eagle Transmission" },
    { label: "Travel", value: "170mm / 170mm" },
    { label: "Brakes", value: "SRAM Maven Silver" }
  ]
},
{
  id: "v17",
  slug: "dengfu-e82-m560-750w",
  title: "Dengfu E82 Carbon E-MTB",
  subtitle: "Full-suspension carbon electric mountain bike",
  make: "Dengfu",
  model: "E82 M560",
  year: 2025,
  condition: "New",
  price: 439900,
  mileage: "N/A",
  fuel: "Electric",
  bodyStyle: "EBike",
  transmission: "Manual",
  location: "Mangalore, Karnataka",
  sellerName: "Coastal E-Bikes",
  sellerType: "Premium Dealer",
  description:
    "Premium carbon-fiber enduro eMTB powered by the Bafang M560 mid-drive motor. Designed for aggressive trail and mountain riding with long-travel suspension and a high-capacity battery.",
  summary:
    "750W carbon electric mountain bike with 1008Wh battery and 170mm suspension.",
  color: "Black Matt",
  seats: 1,
  financeEstimate: 10500,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #111827, #374151)",
  imageUrls: [
    "https://i.pinimg.com/736x/62/9a/a2/629aa22514d0ac927cc2c51650e7d849.jpg"
  ],
  features: [
    "Toray T700/T800 carbon frame",
    "Bafang M560 750W mid-drive motor",
    "1008Wh battery",
    "170mm rear suspension travel",
    "Internal cable routing",
    "29-inch wheel compatibility"
  ],
  specs: [
    { label: "Motor", value: "Bafang M560 750W" },
    { label: "Torque", value: "130 Nm" },
    { label: "Battery", value: "48V 21Ah (1008Wh)" },
    { label: "Frame", value: "Toray T700/T800 Carbon Fiber" },
    { label: "Travel", value: "170mm" },
    { label: "Wheel Size", value: "29 x 2.6 / 27.5 x 2.8" },
    { label: "Brakes", value: "Hydraulic Disc" },
    { label: "Top Speed", value: "45 km/h" }
  ]
},
{
  id: "v18",
  slug: "m600-carbon-fiber-electric-mountain-bike",
  title: "M600 Carbon Fiber Electric Mountain Bicycle",
  subtitle: "High-performance carbon eMTB with mid-drive motor",
  make: "Dengfu",
  model: "M600 Carbon E-MTB",
  year: 2025,
  condition: "Used",
  price: 349999,
  mileage: "N/A",
  fuel: "Electric",
  bodyStyle: "EBike",
  transmission: "Manual",
  location: "Bengaluru, Karnataka",
  sellerName: "E-Bike World",
  sellerType: "Authorized Dealer",
  description:
    "Premium electric mountain bike built with a lightweight carbon fiber frame and powerful Bafang M600 mid-drive motor. Designed for trail riding, climbing, and long-distance adventures.",
  summary:
    "Carbon-frame electric MTB with powerful mid-drive motor and long-range battery.",
  color: "Matte Black",
  seats: 1,
  financeEstimate: 8400,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #111827, #374151)",
  imageUrls: [
    "https://i.pinimg.com/1200x/8b/59/f2/8b59f2ffa43ee9ca1c9ecf8062cd271d.jpg",
  ],
  features: [
    "Carbon fiber frame",
    "Bafang M600 mid-drive motor",
    "Integrated battery",
    "Full suspension",
    "Hydraulic disc brakes",
    "29-inch wheels"
  ],
  specs: [
    { label: "Motor", value: "Bafang M600 500W" },
    { label: "Torque", value: "120 Nm" },
    { label: "Battery", value: "48V 17.5Ah Lithium-ion" },
    { label: "Frame", value: "Carbon Fiber" },
    { label: "Range", value: "Up to 120 km" },
    { label: "Top Speed", value: "45 km/h" },
    { label: "Brakes", value: "Hydraulic Disc" },
    { label: "Wheel Size", value: "29 inch" }
  ]
},
{
  id: "v19",
  slug: "tvs-jupiter-125-smartxconnect-2024",
  title: "TVS Jupiter 125 SmartXonnect",
  subtitle: "Feature-rich scooter with Bluetooth connectivity",
  make: "TVS",
  model: "Jupiter 125 SmartXonnect",
  year: 2024,
  condition: "New",
  price: 89500,
  mileage: "8,500 km",
  fuel: "Petrol",
  bodyStyle: "Scooter",
  transmission: "Automatic",
  location: "Mangalore",
  sellerName: "Coastal Wheels",
  sellerType: "Garage",
  description:
    "Well-maintained family scooter with excellent ride comfort, spacious storage, and connected features.",
  summary:
    "Popular 125cc scooter with verified service history and low mileage.",
  color: "Dawn Orange",
  seats: 2,
  financeEstimate: 1900,
  rating: 4.7,
  heroTone: "linear-gradient(135deg, #ea580c, #f97316)",
  imageUrls: [
    "https://i.pinimg.com/736x/89/d9/00/89d900db66340cd4abff82d59fdbc293.jpg"
  ],
  features: [
    "Bluetooth connectivity",
    "Turn-by-turn navigation",
    "External fuel fill",
    "LED headlamp"
  ],
  specs: [
    { label: "Engine", value: "124.8 cc" },
    { label: "Mileage", value: "~50 km/l" },
    { label: "Ownership", value: "1st owner" },
    { label: "Insurance", value: "Comprehensive active" }
  ]
},
{
  id: "v20",
  slug: "suzuki-access-125-2024",
  title: "Suzuki Access 125",
  subtitle: "Comfortable family scooter with excellent mileage",
  make: "Suzuki",
  model: "Access 125",
  year: 2024,
  condition: "New",
  price: 84500,
  mileage: "9,800 km",
  fuel: "Petrol",
  bodyStyle: "Scooter",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Metro Wheels",
  sellerType: "Garage",
  description:
    "Well-maintained scooter with smooth engine performance and spacious under-seat storage.",
  summary: "Popular 125cc scooter with good resale value.",
  color: "Metallic Matte Black",
  seats: 2,
  financeEstimate: 1800,
  rating: 4.6,
  heroTone: "linear-gradient(135deg, #111827, #4b5563)",
  imageUrls: ["https://i.pinimg.com/1200x/06/ea/51/06ea51359bdb01d058a50ae8e14fa1e7.jpg"],
  features: ["LED headlamp", "External fuel lid", "Large storage"],
  specs: [
    { label: "Engine", value: "124cc" },
    { label: "Mileage", value: "~50 km/l" },
    { label: "Ownership", value: "1st owner" },
    { label: "Insurance", value: "Active" }
  ]
},
{
  id: "v21",
  slug: "yamaha-fascino-125-fi-hybrid-2024",
  title: "Yamaha Fascino 125 Fi Hybrid",
  subtitle: "Stylish hybrid scooter with smart motor assist",
  make: "Yamaha",
  model: "Fascino 125 Fi Hybrid",
  year: 2024,
  condition: "Used",
  price: 89900,
  mileage: "7,200 km",
  fuel: "Petrol",
  bodyStyle: "Scooter",
  transmission: "Automatic",
  location: "Udupi",
  sellerName: "Coastal Motors",
  sellerType: "Dealer",
  description:
    "Elegant scooter with hybrid assist technology and premium styling.",
  summary: "Lightweight scooter with impressive fuel economy.",
  color: "Dark Matte Blue",
  seats: 2,
  financeEstimate: 1900,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
  imageUrls: ["https://i.pinimg.com/1200x/f9/4b/5f/f94b5f5cea170d2b42d84c40aed400a9.jpg"],
  features: ["Hybrid assist", "Bluetooth", "Side stand engine cut-off"],
  specs: [
    { label: "Engine", value: "125cc" },
    { label: "Mileage", value: "~55 km/l" },
    { label: "Ownership", value: "1st owner" },
    { label: "Insurance", value: "Active" }
  ]
},
{
  id: "v22",
  slug: "ktm-duke-390-2024",
  title: "KTM Duke 390",
  subtitle: "Performance street bike with quick handling and premium features",
  make: "KTM",
  model: "Duke 390",
  year: 2024,
  condition: "Used",
  price: 289000,
  mileage: "6,500 km",
  fuel: "Petrol",
  bodyStyle: "Motorcycle",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Orange Wheels",
  sellerType: "Individual Dealer",
  description:
    "Well-maintained performance motorcycle featuring aggressive styling, ride-by-wire throttle, and advanced electronics for spirited city and highway riding.",
  summary:
    "Premium used streetfighter motorcycle with verified ownership and service history.",
  color: "Electronic Orange",
  seats: 2,
  financeEstimate: 6200,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #ea580c, #f97316)",
  imageUrls: [
    "https://i.pinimg.com/1200x/9b/6f/fa/9b6ffaac3f27f5ee293f4c1f3e77131b.jpg"
  ],
  features: [
    "TFT display",
    "Ride-by-wire throttle",
    "Quickshifter+",
    "Service history available"
  ],
  specs: [
    { label: "Engine", value: "399 cc" },
    { label: "Mileage", value: "28 km/l" },
    { label: "ABS", value: "Dual-channel" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v23",
  slug: "yamaha-r15-v4-2024",
  title: "Yamaha R15 V4",
  subtitle: "Sport bike with advanced electronics and racing-inspired design",
  make: "Yamaha",
  model: "R15 V4",
  year: 2024,
  condition: "New",
  price: 182000,
  mileage: "7,400 km",
  fuel: "Petrol",
  bodyStyle: "Motorcycle",
  transmission: "Manual",
  location: "Mangalore",
  sellerName: "Coastal Riders",
  sellerType: "Individual Dealer",
  description:
    "Well-maintained sport motorcycle featuring a liquid-cooled engine, quick shifter, traction control, and aggressive supersport styling.",
  summary:
    "Popular entry-level sport bike with low mileage and complete service records.",
  color: "Racing Blue",
  seats: 2,
  financeEstimate: 3900,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
  imageUrls: [
    "https://i.pinimg.com/1200x/4a/f5/e0/4af5e015459c8182211f479cd232376d.jpg"
  ],
  features: [
    "Quick Shifter",
    "Traction Control System",
    "Assist & Slipper Clutch",
    "LED Lighting"
  ],
  specs: [
    { label: "Engine", value: "155 cc" },
    { label: "Mileage", value: "45 km/l" },
    { label: "ABS", value: "Dual-channel" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v24",
  slug: "jawa-42-bobber-2024",
  title: "Jawa 42 Bobber",
  subtitle: "Factory bobber motorcycle with premium styling and strong road presence",
  make: "Jawa",
  model: "42 Bobber",
  year: 2024,
  condition: "Used",
  price: 214000,
  mileage: "5,800 km",
  fuel: "Petrol",
  bodyStyle: "Motorcycle",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Classic Ride Hub",
  sellerType: "Individual Dealer",
  description:
    "Stylish bobber motorcycle featuring a low-slung stance, floating single seat, alloy wheels, and a powerful liquid-cooled engine for relaxed highway cruising.",
  summary:
    "Premium used bobber with low mileage, service records, and excellent condition.",
  color: "Mystic Copper",
  seats: 1,
  financeEstimate: 4600,
  rating: 4.7,
  heroTone: "linear-gradient(135deg, #78350f, #d97706)",
  imageUrls: [
    "https://i.pinimg.com/736x/30/34/e3/3034e3ee90e10dc8bde9eedf6913fd28.jpg"
  ],
  features: [
    "Floating single seat",
    "Full LED lighting",
    "Digital instrument cluster",
    "Dual-channel ABS"
  ],
  specs: [
    { label: "Engine", value: "334 cc" },
    { label: "Mileage", value: "30 km/l" },
    { label: "ABS", value: "Dual-channel" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v25",
  slug: "mazda-3-hatchback-2024",
  title: "Mazda 3 Hatchback",
  subtitle: "Premium hatchback with sporty styling and refined driving dynamics",
  make: "Mazda",
  model: "3 Hatchback",
  year: 2024,
  condition: "New",
  price: 2495000,
  mileage: "12,300 km",
  fuel: "Petrol",
  bodyStyle: "Hatchback",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Premium Auto Gallery",
  sellerType: "Dealer",
  description:
    "Well-maintained premium hatchback featuring elegant design, a driver-focused cabin, advanced safety technologies, and responsive performance.",
  summary:
    "Low-mileage premium hatchback with complete service records and verified ownership.",
  color: "Soul Red Crystal",
  seats: 5,
  financeEstimate: 52500,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #991b1b, #dc2626)",
  imageUrls: [
    "https://i.pinimg.com/1200x/76/d2/9c/76d29ca2c688e794f1cca7b2510d218a.jpg"
  ],
  features: [
    "Leather upholstery",
    "Adaptive cruise control",
    "360-degree camera",
    "Apple CarPlay & Android Auto"
  ],
  specs: [
    { label: "Engine", value: "2.5L Petrol" },
    { label: "Power", value: "191 hp" },
    { label: "Transmission", value: "6-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v26",
  slug: "hyundai-i20-n-line-n8-2024",
  title: "Hyundai i20 N Line N8",
  subtitle: "Sporty premium hatchback with turbocharged performance",
  make: "Hyundai",
  model: "i20 N Line N8",
  year: 2024,
  condition: "Used",
  price: 1195000,
  mileage: "14,500 km",
  fuel: "Petrol",
  bodyStyle: "Hatchback",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Prime Auto Hub",
  sellerType: "Dealer",
  description:
    "Well-maintained performance hatchback featuring a 1.0L turbo-petrol engine, sporty N Line styling, and premium interior features for enthusiastic drivers.",
  summary:
    "Popular turbocharged hatchback with low mileage and complete service history.",
  color: "Thunder Blue",
  seats: 5,
  financeEstimate: 24900,
  rating: 4.7,
  heroTone: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
  imageUrls: [
    "https://i.pinimg.com/736x/00/71/b7/0071b79a734509d012106410c901adb8.jpg"
  ],
  features: [
    "Electric sunroof",
    "Bose premium audio",
    "Wireless charger",
    "Connected car technology"
  ],
  specs: [
    { label: "Engine", value: "998 cc Turbo Petrol" },
    { label: "Power", value: "120 PS" },
    { label: "Transmission", value: "6-Speed Manual" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v27",
  slug: "volkswagen-golf-gti-2025",
  title: "Volkswagen Golf GTI",
  subtitle: "Iconic hot hatch with turbocharged performance and premium features",
  make: "Volkswagen",
  model: "Golf GTI",
  year: 2025,
  condition: "Used",
  price: 4890000,
  mileage: "9,200 km",
  fuel: "Petrol",
  bodyStyle: "Hatchback",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Elite Performance Cars",
  sellerType: "Dealer",
  description:
    "Performance-oriented hatchback featuring a powerful turbocharged engine, sporty suspension setup, and premium interior with advanced driver assistance features.",
  summary:
    "Low-mileage hot hatch offering an engaging driving experience and everyday practicality.",
  color: "Moonstone Grey",
  seats: 5,
  financeEstimate: 102000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #374151, #111827)",
  imageUrls: [
    "https://i.pinimg.com/1200x/6f/d2/c8/6fd2c89b2edb44fd62f27d9473593b15.jpg"
  ],
  features: [
    "Panoramic sunroof",
    "Digital cockpit",
    "Adaptive cruise control",
    "Wireless Apple CarPlay & Android Auto"
  ],
  specs: [
    { label: "Engine", value: "2.0L TSI Turbo Petrol" },
    { label: "Power", value: "265 PS" },
    { label: "Transmission", value: "7-Speed DSG" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v28",
  slug: "bmw-m135i-xdrive-2025",
  title: "BMW M135i xDrive",
  subtitle: "Performance hatchback with all-wheel drive and M Sport dynamics",
  make: "BMW",
  model: "M135i xDrive",
  year: 2025,
  condition: "New",
  price: 5690000,
  mileage: "8,400 km",
  fuel: "Petrol",
  bodyStyle: "Hatchback",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prestige Performance Motors",
  sellerType: "Dealer",
  description:
    "Premium performance hatchback featuring BMW M engineering, intelligent xDrive all-wheel drive, adaptive suspension, and a powerful turbocharged engine.",
  summary:
    "High-performance luxury hatchback with low mileage and complete service records.",
  color: "Alpine White",
  seats: 5,
  financeEstimate: 118000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #1e293b, #0f172a)",
  imageUrls: [
    "https://i.pinimg.com/736x/10/84/47/10844728973a2ec07305158b7490d88d.jpg"
  ],
  features: [
    "xDrive All-Wheel Drive",
    "M Sport Package",
    "Adaptive LED Headlights",
    "Harman Kardon Sound System"
  ],
  specs: [
    { label: "Engine", value: "2.0L TwinPower Turbo Petrol" },
    { label: "Power", value: "300 hp" },
    { label: "Transmission", value: "7-Speed Steptronic Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v29",
  slug: "skoda-slavia-1-5-tsi-style-2024",
  title: "Skoda Slavia 1.5 TSI Style",
  subtitle: "Premium sedan with turbocharged performance and spacious cabin",
  make: "Skoda",
  model: "Slavia 1.5 TSI Style",
  year: 2024,
  condition: "Used",
  price: 1545000,
  mileage: "13,200 km",
  fuel: "Petrol",
  bodyStyle: "Sedan",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prime Auto Hub",
  sellerType: "Dealer",
  description:
    "Well-maintained premium sedan featuring a powerful turbo-petrol engine, ventilated seats, sunroof, and complete service history.",
  summary:
    "Low-mileage sedan with premium features and excellent highway comfort.",
  color: "Candy White",
  seats: 5,
  financeEstimate: 32000,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #0f172a, #475569)",
  imageUrls: [
    "https://i.pinimg.com/736x/ff/99/e5/ff99e54f91c39c0673708b80df135a6c.jpg"
  ],
  features: [
    "Electric sunroof",
    "Ventilated front seats",
    "Wireless Android Auto & Apple CarPlay",
    "Cruise control"
  ],
  specs: [
    { label: "Engine", value: "1498 cc TSI Petrol" },
    { label: "Power", value: "150 PS" },
    { label: "Transmission", value: "7-Speed DSG" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v30",
  slug: "toyota-camry-hybrid-2024",
  title: "Toyota Camry Hybrid",
  subtitle: "Premium hybrid sedan with exceptional comfort and fuel efficiency",
  make: "Toyota",
  model: "Camry Hybrid",
  year: 2024,
  condition: "Used",
  price: 4295000,
  mileage: "11,800 km",
  fuel: "Hybrid",
  bodyStyle: "Sedan",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prestige Toyota Select",
  sellerType: "Dealer",
  description:
    "Luxury hybrid sedan featuring a refined cabin, advanced safety technologies, smooth automatic transmission, and outstanding fuel efficiency for city and highway driving.",
  summary:
    "Premium executive sedan with hybrid technology, low mileage, and complete service records.",
  color: "Platinum White Pearl",
  seats: 5,
  financeEstimate: 89000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #334155, #0f172a)",
  imageUrls: [
    "https://i.pinimg.com/1200x/6f/6f/95/6f6f952ab8c020e56949561de9ae64a3.jpg"
  ],
  features: [
    "Hybrid powertrain",
    "JBL premium audio system",
    "Wireless phone charger",
    "Toyota Safety Sense"
  ],
  specs: [
    { label: "Engine", value: "2487 cc Hybrid Petrol" },
    { label: "Power", value: "230 PS" },
    { label: "Mileage", value: "25 km/l" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v31",
  slug: "mercedes-benz-c300-amg-line-2024",
  title: "Mercedes-Benz C 300 AMG Line",
  subtitle: "Luxury sedan with advanced technology and refined performance",
  make: "Mercedes-Benz",
  model: "C 300 AMG Line",
  year: 2024,
  condition: "New",
  price: 6250000,
  mileage: "9,600 km",
  fuel: "Petrol",
  bodyStyle: "Sedan",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Star Select Motors",
  sellerType: "Dealer",
  description:
    "Premium luxury sedan featuring AMG styling, a turbocharged engine, digital cockpit, and advanced driver assistance systems. Maintained with authorized service records.",
  summary:
    "Executive luxury sedan with low mileage, premium features, and verified ownership.",
  color: "Obsidian Black",
  seats: 5,
  financeEstimate: 129000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #111827, #374151)",
  imageUrls: [
    "https://i.pinimg.com/1200x/d8/42/af/d842af6afc1df43d48a3ea097129a850.jpg"
  ],
  features: [
    "AMG Line Package",
    "Burmester Surround Sound System",
    "Panoramic Sunroof",
    "Wireless Apple CarPlay & Android Auto"
  ],
  specs: [
    { label: "Engine", value: "1999 cc Turbo Petrol" },
    { label: "Power", value: "258 PS" },
    { label: "Transmission", value: "9G-TRONIC Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v32",
  slug: "toyota-innova-hycross-zx-hybrid-2024",
  title: "Toyota Innova HyCross ZX Hybrid",
  subtitle: "Premium MPV with hybrid efficiency and spacious 7-seater comfort",
  make: "Toyota",
  model: "Innova HyCross ZX Hybrid",
  year: 2024,
  condition: "Used",
  price: 3295000,
  mileage: "18,400 km",
  fuel: "Hybrid",
  bodyStyle: "MUV",
  transmission: "Automatic",
  location: "Mangalore",
  sellerName: "Coastal Auto Select",
  sellerType: "Dealer",
  description:
    "Premium family MPV with hybrid technology, panoramic sunroof, ottoman seats, and Toyota reliability. Ideal for long-distance travel and daily family use.",
  summary:
    "Well-maintained 7-seater hybrid MPV with low running costs and complete service history.",
  color: "Attitude Black",
  seats: 7,
  financeEstimate: 68000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #0f172a, #334155)",
  imageUrls: [
    "https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  features: [
    "Panoramic sunroof",
    "Ottoman second-row seats",
    "360-degree camera",
    "Toyota Safety Sense"
  ],
  specs: [
    { label: "Engine", value: "1987 cc Hybrid Petrol" },
    { label: "Power", value: "186 PS" },
    { label: "Mileage", value: "21 km/l" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v33",
  slug: "kia-carens-prestige-plus-2024",
  title: "Kia Carens Prestige Plus",
  subtitle: "Spacious family MPV with premium features and comfortable seating",
  make: "Kia",
  model: "Carens Prestige Plus",
  year: 2024,
  condition: "Used",
  price: 1495000,
  mileage: "18,700 km",
  fuel: "Petrol",
  bodyStyle: "MUV",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "South Star Motors",
  sellerType: "Dealer",
  description:
    "Well-maintained 7-seater MPV featuring a spacious cabin, touchscreen infotainment system, rear AC vents, and complete service history.",
  summary:
    "Practical family MPV with low mileage, premium comfort, and verified ownership.",
  color: "Imperial Blue",
  seats: 7,
  financeEstimate: 31500,
  rating: 4.7,
  heroTone: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  imageUrls: [
    "https://i.pinimg.com/1200x/25/f7/21/25f721ebce86c7276e89ffe662bd356c.jpg"
  ],
  features: [
    "10.25-inch touchscreen",
    "Wireless Android Auto & Apple CarPlay",
    "Rear AC vents",
    "Cruise control"
  ],
  specs: [
    { label: "Engine", value: "1497 cc Petrol" },
    { label: "Power", value: "115 PS" },
    { label: "Mileage", value: "16.5 km/l" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v34",
  slug: "renault-triber-rxz-2024",
  title: "Renault Triber RXZ",
  subtitle: "Versatile 7-seater MPV with modular seating and excellent practicality",
  make: "Renault",
  model: "Triber RXZ",
  year: 2024,
  condition: "Used",
  price: 765000,
  mileage: "22,400 km",
  fuel: "Petrol",
  bodyStyle: "MUV",
  transmission: "Manual",
  location: "Mysuru",
  sellerName: "City Drive Motors",
  sellerType: "Dealer",
  description:
    "Well-maintained family MPV featuring flexible 7-seat configuration, touchscreen infotainment, and spacious cabin. Ideal for city commutes and weekend family trips.",
  summary:
    "Affordable 7-seater MPV with practical features and verified service history.",
  color: "Moonlight Silver",
  seats: 7,
  financeEstimate: 15900,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #64748b, #334155)",
  imageUrls: [
    "https://i.pinimg.com/736x/22/e9/64/22e964f7c4e6e89408ece401ccb6539a.jpg"
  ],
  features: [
    "Flexible modular seating",
    "8-inch touchscreen infotainment",
    "Push-button start",
    "Rear parking camera"
  ],
  specs: [
    { label: "Engine", value: "999 cc Petrol" },
    { label: "Power", value: "72 PS" },
    { label: "Mileage", value: "19 km/l" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v35",
  slug: "bmw-430i-m-sport-coupe-2024",
  title: "BMW 430i M Sport Coupe",
  subtitle: "Luxury coupe with sporty handling and premium features",
  make: "BMW",
  model: "430i M Sport Coupe",
  year: 2024,
  condition: "New",
  price: 5895000,
  mileage: "8,900 km",
  fuel: "Petrol",
  bodyStyle: "Coupe",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prestige Auto Select",
  sellerType: "Dealer",
  description:
    "Premium luxury coupe featuring BMW TwinPower Turbo performance, frameless doors, adaptive suspension, and a driver-focused cockpit.",
  summary:
    "Low-mileage luxury coupe with sporty dynamics and complete service history.",
  color: "Brooklyn Grey",
  seats: 4,
  financeEstimate: 122000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #1f2937, #111827)",
  imageUrls: [
    "https://i.pinimg.com/1200x/58/f9/bc/58f9bc0ac5a1471795c8ff19f1107b9b.jpg"
  ],
  features: [
    "M Sport Package",
    "Adaptive LED Headlights",
    "Harman Kardon Sound System",
    "Wireless Apple CarPlay & Android Auto"
  ],
  specs: [
    { label: "Engine", value: "1998 cc Turbo Petrol" },
    { label: "Power", value: "258 PS" },
    { label: "Transmission", value: "8-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v36",
  slug: "porsche-911-carrera-2024",
  title: "Porsche 911 Carrera",
  subtitle: "Iconic sports coupe with precision handling and everyday usability",
  make: "Porsche",
  model: "911 Carrera",
  year: 2024,
  condition: "New",
  price: 18500000,
  mileage: "6,200 km",
  fuel: "Petrol",
  bodyStyle: "Coupe",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Elite Performance Cars",
  sellerType: "Dealer",
  description:
    "Meticulously maintained sports coupe featuring Porsche's legendary rear-engine layout, rapid acceleration, premium craftsmanship, and cutting-edge technology.",
  summary:
    "Low-mileage luxury sports car with complete service history and verified ownership.",
  color: "Guards Red",
  seats: 4,
  financeEstimate: 385000,
  rating: 5.0,
  heroTone: "linear-gradient(135deg, #991b1b, #dc2626)",
  imageUrls: [
    "https://i.pinimg.com/1200x/11/d1/1b/11d11bb564f0bdabcb2e94b969f11e32.jpg"
  ],
  features: [
    "Sport Chrono Package",
    "Porsche Active Suspension Management",
    "Bose Surround Sound System",
    "Wireless Apple CarPlay"
  ],
  specs: [
    { label: "Engine", value: "2981 cc Twin-Turbo Flat-6" },
    { label: "Power", value: "394 PS" },
    { label: "Transmission", value: "8-Speed PDK Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v37",
  slug: "bmw-z4-m40i-roadster-2024",
  title: "BMW Z4 M40i Roadster",
  subtitle: "Luxury convertible sports car with turbocharged performance",
  make: "BMW",
  model: "Z4 M40i Roadster",
  year: 2024,
  condition: "Used",
  price: 8950000,
  mileage: "7,800 km",
  fuel: "Petrol",
  bodyStyle: "Convertible",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prestige Auto Select",
  sellerType: "Dealer",
  description:
    "Premium two-seater convertible featuring a retractable soft-top roof, powerful inline-six engine, adaptive suspension, and luxurious cabin amenities.",
  summary:
    "Low-mileage luxury roadster with thrilling performance and complete service history.",
  color: "San Francisco Red",
  seats: 2,
  financeEstimate: 186000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #991b1b, #dc2626)",
  imageUrls: [
    "https://i.pinimg.com/1200x/d7/de/2c/d7de2c8e0a1788bb6c304f5363c3c689.jpg"
  ],
  features: [
    "Retractable soft-top roof",
    "Harman Kardon surround sound",
    "Adaptive M suspension",
    "Wireless Apple CarPlay & Android Auto"
  ],
  specs: [
    { label: "Engine", value: "2998 cc TwinPower Turbo Petrol" },
    { label: "Power", value: "340 PS" },
    { label: "Transmission", value: "8-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v38",
  slug: "ford-mustang-gt-convertible-2024",
  title: "Ford Mustang GT Convertible",
  subtitle: "Iconic American muscle car with open-top driving experience",
  make: "Ford",
  model: "Mustang GT Convertible",
  year: 2024,
  condition: "Used",
  price: 9250000,
  mileage: "5,900 km",
  fuel: "Petrol",
  bodyStyle: "Convertible",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Performance Auto Gallery",
  sellerType: "Dealer",
  description:
    "Powerful convertible sports car featuring a naturally aspirated V8 engine, premium interior, advanced driver technology, and an electrically operated soft-top roof.",
  summary:
    "Low-mileage muscle car offering thrilling performance and open-air driving enjoyment.",
  color: "Race Red",
  seats: 4,
  financeEstimate: 192000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #7f1d1d, #dc2626)",
  imageUrls: [
    "https://images.unsplash.com/photo-1772593547280-d480065a9f73?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  features: [
    "Power-operated soft-top roof",
    "Digital instrument cluster",
    "B&O premium sound system",
    "Selectable drive modes"
  ],
  specs: [
    { label: "Engine", value: "5.0L V8 Petrol" },
    { label: "Power", value: "486 PS" },
    { label: "Transmission", value: "10-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v39",
  slug: "mercedes-benz-cle-300-cabriolet-2025",
  title: "Mercedes-Benz CLE 300 Cabriolet",
  subtitle: "Luxury four-seater convertible with premium comfort and elegant styling",
  make: "Mercedes-Benz",
  model: "CLE 300 Cabriolet",
  year: 2025,
  condition: "Used",
  price: 11250000,
  mileage: "4,800 km",
  fuel: "Petrol",
  bodyStyle: "Convertible",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Star Luxury Cars",
  sellerType: "Dealer",
  description:
    "Premium convertible featuring a fully automatic soft-top roof, advanced driver assistance systems, Burmester audio, and a luxurious cabin designed for comfortable open-air cruising.",
  summary:
    "Low-mileage luxury cabriolet with premium features, verified ownership, and complete service history.",
  color: "Obsidian Black",
  seats: 4,
  financeEstimate: 234000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #111827, #4b5563)",
  imageUrls: [
    "https://i.pinimg.com/736x/61/04/5d/61045d46094aec07c1da11773b67d9b9.jpg"
  ],
  features: [
    "Fully automatic soft-top roof",
    "Burmester 3D surround sound",
    "AIRSCARF neck-level heating",
    "MBUX infotainment system"
  ],
  specs: [
    { label: "Engine", value: "1999 cc Turbo Petrol" },
    { label: "Power", value: "258 PS" },
    { label: "Transmission", value: "9G-TRONIC Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v40",
  slug: "volvo-v60-cross-country-2024",
  title: "Volvo V60 Cross Country",
  subtitle: "Luxury estate wagon with all-road capability and premium comfort",
  make: "Volvo",
  model: "V60 Cross Country",
  year: 2024,
  condition: "New",
  price: 5890000,
  mileage: "12,500 km",
  fuel: "Petrol",
  bodyStyle: "Wagon",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Scandinavian Auto Select",
  sellerType: "Dealer",
  description:
    "Premium estate wagon offering exceptional comfort, advanced safety features, spacious cargo capacity, and all-road versatility.",
  summary:
    "Luxury wagon with practical space, premium features, and complete service history.",
  color: "Crystal White Pearl",
  seats: 5,
  financeEstimate: 122000,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #475569, #0f172a)",
  imageUrls: [
    "https://i.pinimg.com/1200x/33/4b/a1/334ba12470cb556fd38e85ab65997bd8.jpg"
  ],
  features: [
    "Panoramic sunroof",
    "Pilot Assist",
    "Harman Kardon audio",
    "All-wheel drive"
  ],
  specs: [
    { label: "Engine", value: "1969 cc Turbo Petrol" },
    { label: "Power", value: "250 PS" },
    { label: "Transmission", value: "8-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},{
  id: "v41",
  slug: "audi-a4-avant-2024",
  title: "Audi A4 Avant",
  subtitle: "Premium estate wagon with sporty styling and versatile cargo space",
  make: "Audi",
  model: "A4 Avant",
  year: 2024,
  condition: "Used",
  price: 5490000,
  mileage: "11,300 km",
  fuel: "Petrol",
  bodyStyle: "Wagon",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Prestige Luxury Motors",
  sellerType: "Dealer",
  description:
    "Elegant premium estate featuring Audi's signature design, spacious luggage capacity, advanced technology, and refined driving dynamics for both city and long-distance travel.",
  summary:
    "Luxury wagon with low mileage, premium features, and complete service records.",
  color: "Daytona Grey Pearl",
  seats: 5,
  financeEstimate: 114000,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #374151, #111827)",
  imageUrls: [
    "https://images.unsplash.com/photo-1741029482311-0b8e2493c7e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  features: [
    "Virtual Cockpit",
    "Panoramic Sunroof",
    "Wireless Apple CarPlay & Android Auto",
    "Powered Tailgate"
  ],
  specs: [
    { label: "Engine", value: "1984 cc TFSI Petrol" },
    { label: "Power", value: "204 PS" },
    { label: "Transmission", value: "7-Speed S tronic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v42",
  slug: "porsche-taycan-cross-turismo-2025",
  title: "Porsche Taycan Cross Turismo",
  subtitle: "High-performance electric estate with sports car dynamics and everyday practicality",
  make: "Porsche",
  model: "Taycan Cross Turismo",
  year: 2025,
  condition: "New",
  price: 16500000,
  mileage: "8,100 km",
  fuel: "Electric",
  bodyStyle: "Wagon",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Elite EV Motors",
  sellerType: "Dealer",
  description:
    "Premium electric wagon combining Porsche performance with a spacious cabin, advanced technology, and long-range capability. Ideal for luxury touring and daily driving.",
  summary:
    "Luxury electric estate with low mileage, premium features, and verified ownership.",
  color: "Ice Grey Metallic",
  seats: 5,
  financeEstimate: 343000,
  rating: 4.9,
  heroTone: "linear-gradient(135deg, #0f172a, #475569)",
  imageUrls: [
    "https://i.pinimg.com/736x/31/83/98/3183988fa09163680ea61b71f5104328.jpg"
  ],
  features: [
    "Panoramic fixed glass roof",
    "Adaptive air suspension",
    "Bose surround sound system",
    "Fast DC charging"
  ],
  specs: [
    { label: "Battery", value: "93.4 kWh Performance Battery Plus" },
    { label: "Power", value: "476 PS" },
    { label: "Range", value: "Up to 500 km" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v43",
  slug: "bmw-m3-touring-competition-xdrive-2025",
  title: "BMW M3 Touring Competition xDrive",
  subtitle: "High-performance sports wagon with supercar-rivaling performance",
  make: "BMW",
  model: "M3 Touring Competition xDrive",
  year: 2025,
  condition: "New",
  price: 14500000,
  mileage: "5,400 km",
  fuel: "Petrol",
  bodyStyle: "Wagon",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Performance Garage India",
  sellerType: "Dealer",
  description:
    "Performance-focused luxury wagon combining everyday practicality with BMW M engineering. Features xDrive all-wheel drive, adaptive suspension, and a spacious cargo area for long-distance touring.",
  summary:
    "Premium sports estate offering exceptional performance, practicality, and low ownership history.",
  color: "Isle of Man Green",
  seats: 5,
  financeEstimate: 302000,
  rating: 5.0,
  heroTone: "linear-gradient(135deg, #14532d, #166534)",
  imageUrls: [
    "https://images.unsplash.com/photo-1701985203003-1e52f637cf98?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  features: [
    "M xDrive All-Wheel Drive",
    "Adaptive M Suspension",
    "M Carbon Interior Trim",
    "Harman Kardon Surround Sound"
  ],
  specs: [
    { label: "Engine", value: "2993 cc Twin-Turbo Inline-6" },
    { label: "Power", value: "530 PS" },
    { label: "Transmission", value: "8-Speed M Steptronic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v44",
  slug: "force-traveller-3350-super-2024",
  title: "Force Traveller 3350 Super",
  subtitle: "Passenger van designed for staff transport and tour operations",
  make: "Force Motors",
  model: "Traveller 3350 Super",
  year: 2024,
  condition: "New",
  price: 1895000,
  mileage: "38,600 km",
  fuel: "Diesel",
  bodyStyle: "Van",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Commercial Vehicle Hub",
  sellerType: "Dealer",
  description:
    "Reliable passenger van ideal for shuttle services, tourism operators, school transportation, and staff movement. Maintained with complete service records.",
  summary:
    "Well-maintained passenger van offering high seating capacity and dependable diesel performance.",
  color: "Arctic White",
  seats: 14,
  financeEstimate: 39500,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #334155, #64748b)",
  imageUrls: [
    "https://i.pinimg.com/1200x/0c/18/85/0c1885e0760d2e17a0fe667d4eda3a69.jpg"
  ],
  features: [
    "High-roof cabin",
    "Power steering",
    "Rear AC vents",
    "Large luggage space"
  ],
  specs: [
    { label: "Engine", value: "2596 cc Diesel" },
    { label: "Power", value: "115 PS" },
    { label: "Transmission", value: "5-Speed Manual" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v45",
  slug: "tata-winger-tourist-2024",
  title: "Tata Winger Tourist",
  subtitle: "Comfortable passenger van for shuttle, staff transport, and tour operations",
  make: "Tata",
  model: "Winger Tourist",
  year: 2024,
  condition: "New",
  price: 1745000,
  mileage: "42,800 km",
  fuel: "Diesel",
  bodyStyle: "Van",
  transmission: "Manual",
  location: "Mangalore",
  sellerName: "Coastal Commercial Vehicles",
  sellerType: "Dealer",
  description:
    "Well-maintained passenger van designed for staff transportation, airport transfers, tourism, and institutional use. Features a spacious cabin, comfortable seating, and dependable diesel performance.",
  summary:
    "Reliable passenger van with high seating capacity, verified ownership, and complete service records.",
  color: "Pearl White",
  seats: 13,
  financeEstimate: 36500,
  rating: 4.4,
  heroTone: "linear-gradient(135deg, #1e293b, #475569)",
  imageUrls: [
    "https://i.pinimg.com/1200x/f2/eb/30/f2eb30e40531db99287ca42eac6f4a78.jpg"
  ],
  features: [
    "High-roof cabin",
    "Rear air-conditioning",
    "Power steering",
    "Large luggage compartment"
  ],
  specs: [
    { label: "Engine", value: "2179 cc Diesel" },
    { label: "Power", value: "100 PS" },
    { label: "Transmission", value: "5-Speed Manual" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v46",
  slug: "maruti-eeco-cargo-2024",
  title: "Maruti Eeco Cargo",
  subtitle: "Compact cargo van built for deliveries and small business operations",
  make: "Maruti Suzuki",
  model: "Eeco Cargo",
  year: 2024,
  condition: "New",
  price: 545000,
  mileage: "28,900 km",
  fuel: "Petrol",
  bodyStyle: "Van",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "City Commercial Vehicles",
  sellerType: "Dealer",
  description:
    "Practical cargo van ideal for local deliveries, courier services, and small business transportation. Offers low running costs, easy maintenance, and a spacious load area.",
  summary:
    "Reliable commercial cargo van with verified service records and excellent utility.",
  color: "Superior White",
  seats: 2,
  financeEstimate: 11400,
  rating: 4.3,
  heroTone: "linear-gradient(135deg, #475569, #1e293b)",
  imageUrls: [
    "https://i.pinimg.com/736x/45/87/aa/4587aaebecdc5cf614f04f52f4f9b833.jpg"
  ],
  features: [
    "Large cargo compartment",
    "Sliding side doors",
    "Low maintenance costs",
    "Compact city-friendly dimensions"
  ],
  specs: [
    { label: "Engine", value: "1197 cc Petrol" },
    { label: "Power", value: "80 PS" },
    { label: "Transmission", value: "5-Speed Manual" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v47",
  slug: "toyota-hilux-high-4x4-at-2024",
  title: "Toyota Hilux High 4x4 AT",
  subtitle: "Rugged pickup truck with off-road capability and premium comfort",
  make: "Toyota",
  model: "Hilux High 4x4 AT",
  year: 2024,
  condition: "New",
  price: 3495000,
  mileage: "16,800 km",
  fuel: "Diesel",
  bodyStyle: "Pickup",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "Adventure Motors",
  sellerType: "Dealer",
  description:
    "Premium lifestyle pickup truck designed for off-road adventures, farm work, towing, and commercial utility. Features a robust ladder-frame chassis and proven Toyota reliability.",
  summary:
    "Well-maintained 4x4 pickup with low mileage, premium features, and complete service records.",
  color: "Super White",
  seats: 5,
  financeEstimate: 73000,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #1f2937, #111827)",
  imageUrls: [
    "https://i.pinimg.com/1200x/4c/96/c8/4c96c8bbb3acec9b07f72eda17fa0711.jpg"
  ],
  features: [
    "4x4 drivetrain",
    "Automatic transmission",
    "8-inch touchscreen infotainment",
    "Rear differential lock"
  ],
  specs: [
    { label: "Engine", value: "2755 cc Diesel" },
    { label: "Power", value: "204 PS" },
    { label: "Transmission", value: "6-Speed Automatic" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v48",
  slug: "mahindra-scorpio-getaway-4x4-2024",
  title: "Mahindra Scorpio Getaway 4x4",
  subtitle: "Rugged double-cab pickup built for work, adventure, and utility",
  make: "Mahindra",
  model: "Scorpio Getaway 4x4",
  year: 2024,
  condition: "New",
  price: 1395000,
  mileage: "34,200 km",
  fuel: "Diesel",
  bodyStyle: "Pickup",
  transmission: "Manual",
  location: "Mysuru",
  sellerName: "Western Commercial Motors",
  sellerType: "Dealer",
  description:
    "Reliable pickup truck designed for farm operations, construction work, cargo transport, and weekend off-road adventures. Combines Scorpio toughness with an open cargo bed.",
  summary:
    "Versatile double-cab pickup offering 4x4 capability, cargo-carrying practicality, and proven Mahindra durability.",
  color: "Napoli Black",
  seats: 5,
  financeEstimate: 29000,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #374151, #111827)",
  imageUrls: [
    "https://i.pinimg.com/1200x/15/e5/10/15e51005ed6b241a0b478d4612d9a797.jpg"
  ],
  features: [
    "4x4 drivetrain",
    "Double-cab configuration",
    "Large cargo bed",
    "Heavy-duty suspension"
  ],
  specs: [
    { label: "Engine", value: "2179 cc mHawk Diesel" },
    { label: "Power", value: "120 PS" },
    { label: "Transmission", value: "5-Speed Manual" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v49",
  slug: "tata-ace-gold-petrol-cx-2024",
  title: "Tata Ace Gold Petrol CX",
  subtitle: "Compact mini truck for last-mile deliveries and business logistics",
  make: "Tata",
  model: "Ace Gold Petrol CX",
  year: 2024,
  condition: "New",
  price: 485000,
  mileage: "31,500 km",
  fuel: "Petrol",
  bodyStyle: "MiniTruck",
  transmission: "Manual",
  location: "Hubballi",
  sellerName: "Karnataka Commercial Vehicles",
  sellerType: "Dealer",
  description:
    "Reliable mini truck designed for city deliveries, kirana distribution, e-commerce logistics, and small business transportation. Easy to maneuver through narrow urban roads.",
  summary:
    "Well-maintained cargo carrier with low running costs and verified service history.",
  color: "Arctic White",
  seats: 2,
  financeEstimate: 10200,
  rating: 4.4,
  heroTone: "linear-gradient(135deg, #475569, #1e293b)",
  imageUrls: [
    "https://i.pinimg.com/736x/c6/91/fa/c691faead2b0ceaf7fa5339fadb6a5e3.jpg"
  ],
  features: [
    "Large cargo deck",
    "Compact turning radius",
    "Fuel-efficient engine",
    "Heavy-duty chassis"
  ],
  specs: [
    { label: "Engine", value: "694 cc Petrol" },
    { label: "Power", value: "30 PS" },
    { label: "Payload", value: "750 kg" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v50",
  slug: "mahindra-jeeto-plus-cng-2024",
  title: "Mahindra Jeeto Plus CNG",
  subtitle: "Fuel-efficient mini truck for urban cargo and distribution",
  make: "Mahindra",
  model: "Jeeto Plus CNG",
  year: 2024,
  condition: "New",
  price: 525000,
  mileage: "27,800 km",
  fuel: "CNG",
  bodyStyle: "MiniTruck",
  transmission: "Manual",
  location: "Mangalore",
  sellerName: "Coastal Commercial Motors",
  sellerType: "Dealer",
  description:
    "Economical mini truck designed for daily goods transport, grocery distribution, and last-mile logistics with low operating costs.",
  summary:
    "Compact CNG cargo carrier with excellent fuel economy and verified service history.",
  color: "Diamond White",
  seats: 2,
  financeEstimate: 11000,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #166534, #22c55e)",
  imageUrls: [
    "https://i.pinimg.com/1200x/05/9e/46/059e463947173a9bd31351f7f1d47d01.jpg"
  ],
  features: [
    "Factory-fitted CNG",
    "Large cargo deck",
    "Low maintenance costs",
    "High fuel efficiency"
  ],
  specs: [
    { label: "Engine", value: "625 cc CNG" },
    { label: "Power", value: "26 PS" },
    { label: "Payload", value: "715 kg" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v51",
  slug: "maruti-super-carry-petrol-2024",
  title: "Maruti Suzuki Super Carry",
  subtitle: "Versatile mini truck built for daily commercial transportation",
  make: "Maruti Suzuki",
  model: "Super Carry",
  year: 2024,
  condition: "New",
  price: 615000,
  mileage: "24,500 km",
  fuel: "Petrol",
  bodyStyle: "MiniTruck",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Metro Commercial Vehicles",
  sellerType: "Dealer",
  description:
    "Practical commercial vehicle ideal for retail deliveries, market supplies, and local transport operations with dependable Maruti reliability.",
  summary:
    "Well-maintained mini truck with strong payload capacity and complete service records.",
  color: "Silky Silver",
  seats: 2,
  financeEstimate: 12800,
  rating: 4.6,
  heroTone: "linear-gradient(135deg, #1e293b, #64748b)",
  imageUrls: [
    "https://i.pinimg.com/1200x/1d/4f/30/1d4f306ffe27c9b3757537c3bc74a8d0.jpg"
  ],
  features: [
    "Spacious cargo deck",
    "Power steering",
    "Strong ladder-frame chassis",
    "Low running costs"
  ],
  specs: [
    { label: "Engine", value: "1196 cc Petrol" },
    { label: "Power", value: "73 PS" },
    { label: "Payload", value: "740 kg" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v52",
  slug: "bharatbenz-4228r-2023",
  title: "BharatBenz 4228R",
  subtitle: "Heavy-duty freight truck engineered for long-haul logistics operations",
  make: "BharatBenz",
  model: "4228R",
  year: 2023,
  condition: "Used",
  price: 3895000,
  mileage: "72,400 km",
  fuel: "Diesel",
  bodyStyle: "Tipper",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "Elite Commercial Vehicles",
  sellerType: "Dealer",
  description:
    "Reliable heavy commercial truck designed for interstate cargo transportation, fleet operations, and logistics businesses with excellent fuel efficiency and durability.",
  summary:
    "Certified freight truck with documented service history and strong payload capabilities.",
  color: "White",
  seats: 2,
  financeEstimate: 81200,
  rating: 4.7,
  heroTone: "linear-gradient(135deg, #1f2937, #374151)",
  imageUrls: [
    "https://i.pinimg.com/1200x/b0/46/67/b04667a44aa52915ac0a4038b06932c8.jpg"
  ],
  features: [
    "Sleeper cabin",
    "Air brakes",
    "Fleet telematics support",
    "Heavy-duty chassis"
  ],
  specs: [
    { label: "Engine", value: "7200 cc Diesel" },
    { label: "Power", value: "281 HP" },
    { label: "GVW", value: "42000 kg" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v53",
  slug: "ashok-leyland-4825-tractor-2022",
  title: "Ashok Leyland 4825 Tractor",
  subtitle: "Long-haul tractor truck built for fleet and logistics operations",
  make: "Ashok Leyland",
  model: "4825 Tractor",
  year: 2022,
  condition: "New",
  price: 3295000,
  mileage: "118,600 km",
  fuel: "Diesel",
  bodyStyle: "Tipper",
  transmission: "Manual",
  location: "Hubballi",
  sellerName: "Karnataka Freight Trucks",
  sellerType: "Dealer",
  description:
    "Heavy-duty tractor unit designed for container movement, interstate freight transport, and logistics operations. Maintained under a scheduled fleet service program.",
  summary:
    "Dependable haulage truck offering high GVW capacity and verified ownership records.",
  color: "Blue",
  seats: 2,
  financeEstimate: 68800,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  imageUrls: [
    "https://i.pinimg.com/736x/1b/52/18/1b521893eb0a0db1d29ba1ae9acd302c.jpg"
  ],
  features: [
    "Sleeper cabin",
    "Power steering",
    "Air braking system",
    "Long-haul drivetrain"
  ],
  specs: [
    { label: "Engine", value: "5660 cc Diesel" },
    { label: "Power", value: "250 HP" },
    { label: "GVW", value: "47500 kg" },
    { label: "Ownership", value: "2nd owner" }
  ]
},
{
  id: "v54",
  slug: "eicher-pro-6028t-2023",
  title: "Eicher Pro 6028T",
  subtitle: "Heavy-duty tipper truck for construction, quarry, and mining operations",
  make: "Eicher",
  model: "Pro 6028T",
  year: 2023,
  condition: "Used",
  price: 3750000,
  mileage: "64,800 km",
  fuel: "Diesel",
  bodyStyle: "Truck",
  transmission: "Manual",
  location: "Belagavi",
  sellerName: "Western Earthmovers",
  sellerType: "Dealer",
  description:
    "Robust tipper designed for infrastructure projects, quarry operations, and bulk material transportation. Features a durable chassis and high-capacity hydraulic tipping body.",
  summary:
    "Certified commercial tipper with strong payload capability and verified maintenance records.",
  color: "Construction Yellow",
  seats: 3,
  financeEstimate: 78200,
  rating: 4.6,
  heroTone: "linear-gradient(135deg, #a16207, #ca8a04)",
  imageUrls: [
    "https://i.pinimg.com/736x/24/33/df/2433df072a040c6a51beab7e3a234ec5.jpg"
  ],
  features: [
    "Hydraulic tipping mechanism",
    "Heavy-duty chassis",
    "Air brakes",
    "Fleet-maintained vehicle"
  ],
  specs: [
    { label: "Engine", value: "7698 cc Diesel" },
    { label: "Power", value: "280 HP" },
    { label: "GVW", value: "28000 kg" },
    { label: "Ownership", value: "1st owner" }
  ]
},

{
  id: "v55",
  slug: "tata-container-flatbed-trailer-2021",
  title: "Container Flatbed Trailer",
  subtitle: "Heavy-duty flatbed trailer for container and cargo transport",
  make: "Tata",
  model: "40ft Flatbed Trailer",
  year: 2021,
  condition: "Used",
  price: 1250000,
  mileage: "N/A",
  fuel: "Other",
  bodyStyle: "Trailer",
  transmission: "Manual",
  location: "Bengaluru",
  sellerName: "National Trailer Exchange",
  sellerType: "Dealer",
  description:
    "Commercial flatbed trailer designed for container hauling, industrial freight movement, and logistics operations across long distances.",
  summary:
    "Fleet-maintained trailer with strong chassis construction and compliance documentation.",
  color: "Red",
  seats: 0,
  financeEstimate: 26000,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #374151, #111827)",
  imageUrls: [
    "https://i.pinimg.com/736x/23/3f/12/233f1216b101755013093103ceb2d4c0.jpg"
  ],
  features: [
    "40-foot platform",
    "Container lock system",
    "Heavy-duty suspension",
    "Fleet maintained"
  ],
  specs: [
    { label: "Type", value: "Flatbed Trailer" },
    { label: "Length", value: "40 ft" },
    { label: "Payload", value: "35000 kg" },
    { label: "Axles", value: "3" }
  ]
},
{
  id: "v56",
  slug: "skeletal-container-trailer-2022",
  title: "Skeletal Container Trailer",
  subtitle: "Purpose-built trailer for port and container logistics",
  make: "York",
  model: "Skeletal Trailer",
  year: 2022,
  condition: "New",
  price: 1450000,
  mileage: "N/A",
  fuel: "Other",
  bodyStyle: "Trailer",
  transmission: "Manual",
  location: "Mangalore",
  sellerName: "Coastal Logistics Equipment",
  sellerType: "Dealer",
  description:
    "Container transport trailer engineered for port operations, freight corridors, and logistics fleets handling ISO containers.",
  summary:
    "Certified trailer with container locking points and documented maintenance history.",
  color: "Blue",
  seats: 0,
  financeEstimate: 30200,
  rating: 4.6,
  heroTone: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  imageUrls: [
    "https://i.pinimg.com/1200x/20/ba/34/20ba3403b62e8dfefc2510086c2e951d.jpg"
  ],
  features: [
    "ISO container locks",
    "Triple-axle setup",
    "Reinforced steel frame",
    "Fleet-ready condition"
  ],
  specs: [
    { label: "Type", value: "Skeletal Trailer" },
    { label: "Length", value: "40 ft" },
    { label: "Payload", value: "37000 kg" },
    { label: "Axles", value: "3" }
  ]
},
{
  id: "v57",
  slug: "volvo-9400-b11r-sleeper-2022",
  title: "Volvo 9400 B11R Sleeper",
  subtitle: "Premium intercity coach designed for long-distance passenger travel",
  make: "Volvo",
  model: "9400 B11R Sleeper",
  year: 2022,
  condition: "New",
  price: 8500000,
  mileage: "185,000 km",
  fuel: "Diesel",
  bodyStyle: "Bus",
  transmission: "Automatic",
  location: "Bengaluru",
  sellerName: "South India Coach Sales",
  sellerType: "Dealer",
  description:
    "Luxury sleeper coach featuring air suspension, reclining berths, onboard entertainment, and excellent passenger comfort for long-distance routes.",
  summary:
    "Premium intercity coach with documented service history and fleet-maintained condition.",
  color: "Silver",
  seats: 40,
  financeEstimate: 177000,
  rating: 4.8,
  heroTone: "linear-gradient(135deg, #0f172a, #334155)",
  imageUrls: [
    "https://i.pinimg.com/736x/25/b7/bd/25b7bd289ee44a8f3b5b16073b882c38.jpg"
  ],
  features: [
    "Air suspension",
    "Sleeper berths",
    "Air conditioning",
    "Passenger entertainment system"
  ],
  specs: [
    { label: "Engine", value: "10800 cc Diesel" },
    { label: "Power", value: "430 HP" },
    { label: "Seating Capacity", value: "40 Sleeper" },
    { label: "Ownership", value: "1st owner" }
  ]
},
{
  id: "v58",
  slug: "tata-starbus-ultra-2023",
  title: "Tata Starbus Ultra",
  subtitle: "Reliable passenger bus for city and staff transportation",
  make: "Tata",
  model: "Starbus Ultra",
  year: 2023,
  condition: "Used",
  price: 3250000,
  mileage: "96,000 km",
  fuel: "Diesel",
  bodyStyle: "Bus",
  transmission: "Manual",
  location: "Mysuru",
  sellerName: "Karnataka Bus Exchange",
  sellerType: "Dealer",
  description:
    "Comfortable passenger bus suitable for staff transport, school routes, and city operations with dependable Tata reliability.",
  summary:
    "Fleet-maintained passenger bus with verified service records.",
  color: "White",
  seats: 36,
  financeEstimate: 67700,
  rating: 4.5,
  heroTone: "linear-gradient(135deg, #1e293b, #475569)",
  imageUrls: [
    "https://i.pinimg.com/1200x/c4/81/46/c48146d4ad218af69c4d8051c68c696c.jpg"
  ],
  features: [
    "Power steering",
    "Air brakes",
    "Spacious passenger cabin",
    "Emergency exit system"
  ],
  specs: [
    { label: "Engine", value: "5005 cc Diesel" },
    { label: "Power", value: "180 HP" },
    { label: "Seating Capacity", value: "36 Seats" },
    { label: "Ownership", value: "1st owner" }
  ]
},



];

export const featuredVehicleSlugs = [
  "mahindra-scorpio-n-z8-2025",
  "maruti-baleno-alpha-2023",
  "tata-nexon-ev-empowered-2024",
  "tata-signa-2823-tipper-2020",
  "jcb-3dx-super-excavator-2019",
  "honda-activa-6g-2023",
];

export const sellerTypeSlugMap: Record<string, string> = {
  Garage: "garages",
  "Car Showroom": "car-showrooms",
  "Individual Dealer": "individual-dealers",
  "Fleet Seller": "fleet-sellers",
  "Rental Partner": "rental-partners",
  "EV Specialist": "ev-specialists",
};
