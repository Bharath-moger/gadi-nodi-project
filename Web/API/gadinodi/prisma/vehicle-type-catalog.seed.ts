/** Stable crop URLs — browse UX hero imagery (Unsplash). */
const q = "auto=format&fit=crop&w=1600&h=900&q=80";

export interface VehicleTypeCatalogSeedRow {
  slug: string;
  code: string;
  displayName: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export const vehicleTypeCatalogSeedRows: VehicleTypeCatalogSeedRow[] = [
  {
    slug: "bicycle",
    code: "Bicycle",
    displayName: "Bicycle",
    description:
      "City commuters and fitness riders — lightweight frames, gears, and accessories from trusted sellers.",
    imageUrl: `https://images.unsplash.com/photo-1485965120184-e220f721d03e?${q}`,
    sortOrder: 0,
  },
  {
    slug: "e-bike",
    code: "EBike",
    displayName: "E-bike",
    description:
      "Pedal-assist and throttle e-bikes for urban hops and last-mile delivery with battery clarity upfront.",
    imageUrl: `https://images.unsplash.com/photo-1571068316344-75bc76f77890?${q}`,
    sortOrder: 1,
  },
  {
    slug: "scooter",
    code: "Scooter",
    displayName: "Scooter",
    description:
      "Gearless and sporty scooters — everyday mileage champions with straightforward paperwork paths.",
    imageUrl: `https://images.unsplash.com/photo-1628744876497-e957956feb74?${q}`,
    sortOrder: 2,
  },
  {
    slug: "motorcycle",
    code: "Motorcycle",
    displayName: "Motorcycle",
    description:
      "Commuter and touring motorcycles across capacities — compare mileage, ABS, and ownership history.",
    imageUrl: `https://images.unsplash.com/photo-1558980664-769d59546b3d?${q}`,
    sortOrder: 3,
  },
  {
    slug: "hatchback",
    code: "Hatchback",
    displayName: "Hatchback",
    description:
      "Compact cars built for tight parking and low running costs — ideal first cars and city fleets.",
    imageUrl: `https://images.unsplash.com/photo-1494976388532-dfff843299e1?${q}`,
    sortOrder: 4,
  },
  {
    slug: "sedan",
    code: "Sedan",
    displayName: "Sedan",
    description:
      "Comfort-focused three-box silhouettes for highway cruising and executive daily drives.",
    imageUrl: `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?${q}`,
    sortOrder: 5,
  },
  {
    slug: "suv",
    code: "SUV",
    displayName: "SUV",
    description:
      "High-riding family SUVs — terrain-ready choices from compact crossovers to full-size towers.",
    imageUrl: `https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?${q}`,
    sortOrder: 6,
  },
  {
    slug: "muv",
    code: "MUV",
    displayName: "MUV / MPV",
    description:
      "Six- and seven-seater people movers for extended families, fleets, and airport transfers.",
    imageUrl: `https://images.unsplash.com/photo-1544636331-2687092eb9d5?${q}`,
    sortOrder: 7,
  },
  {
    slug: "coupe",
    code: "Coupe",
    displayName: "Coupe",
    description:
      "Two-door elegance — sporty profiles and premium cabins for drivers who prioritise style.",
    imageUrl: `https://images.unsplash.com/photo-1583121274602-3e2820c69888?${q}`,
    sortOrder: 8,
  },
  {
    slug: "convertible",
    code: "Convertible",
    displayName: "Convertible",
    description:
      "Open-top touring — seasonal glamour cars with roof mechanisms spelled out in every listing.",
    imageUrl: `https://images.unsplash.com/photo-1568605117036-5fe5e7bab67b?${q}`,
    sortOrder: 9,
  },
  {
    slug: "wagon",
    code: "Wagon",
    displayName: "Wagon / estate",
    description:
      "Long-roof practicality — cargo volume without crossover bulk for hobbies and road trips.",
    imageUrl: `https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?${q}`,
    sortOrder: 10,
  },
  {
    slug: "van",
    code: "Van",
    displayName: "Van",
    description:
      "Panel vans and passenger vans — tradespeople and shuttle operators compare payloads clearly.",
    imageUrl: `https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?${q}`,
    sortOrder: 11,
  },
  {
    slug: "pickup",
    code: "Pickup",
    displayName: "Pickup truck",
    description:
      "Open-bed utility for farms, contractors, and weekend hauliers — 4x4 and lifestyle trims.",
    imageUrl: `https://images.unsplash.com/photo-1586528116311-ad8dd3cb8314?${q}`,
    sortOrder: 12,
  },
  {
    slug: "mini-truck",
    code: "MiniTruck",
    displayName: "Mini truck",
    description:
      "Last-mile cargo warriors — narrow footprints for intra-city loads and kirana distribution.",
    imageUrl: `https://images.unsplash.com/photo-1601584115197-04ecc0da2d9b?${q}`,
    sortOrder: 13,
  },
  {
    slug: "truck",
    code: "Truck",
    displayName: "Truck",
    description:
      "Rigid haulage — freight-rated tractors and rigs listed with GVW and compliance signals.",
    imageUrl: `https://images.unsplash.com/photo-1565610222533-922619766b3f?${q}`,
    sortOrder: 14,
  },
  {
    slug: "tipper",
    code: "Tipper",
    displayName: "Tipper",
    description:
      "Dump trucks for aggregates, fly ash, and site spoil — hydraulic hoist-ready inventory segments.",
    imageUrl: `https://images.unsplash.com/photo-1589939705384-5185137b7b41?${q}`,
    sortOrder: 15,
  },
  {
    slug: "trailer",
    code: "Trailer",
    displayName: "Trailer",
    description:
      "Flatbeds, tankers, and skeletal trailers — line haul matched equipment disclosed clearly.",
    imageUrl: `https://images.unsplash.com/photo-1519003722824-194445845092?${q}`,
    sortOrder: 16,
  },
  {
    slug: "bus",
    code: "Bus",
    displayName: "Bus",
    description:
      "Staff movers and tourism coaches — seating layouts and permits surfaced beside pricing.",
    imageUrl: `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?${q}`,
    sortOrder: 17,
  },
  {
    slug: "excavator",
    code: "Excavator",
    displayName: "Excavator",
    description:
      "Tracked and wheeled diggers — hour-meter transparency for contractors benchmarking fleets.",
    imageUrl: `https://images.unsplash.com/photo-1590674899484-d5640e854abe?${q}`,
    sortOrder: 18,
  },
  {
    slug: "bulldozer",
    code: "Bulldozer",
    displayName: "Bulldozer",
    description:
      "Tracked pushing power — grading and clearing assets listed with blade widths where supplied.",
    imageUrl: `https://images.unsplash.com/photo-1589939705384-5185137b7b41?${q}`,
    sortOrder: 19,
  },
  {
    slug: "loader",
    code: "Loader",
    displayName: "Wheel loader",
    description:
      "Front-end loaders for quarries and ports — bucket sizing and breakout specs highlighted.",
    imageUrl: `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?${q}`,
    sortOrder: 20,
  },
  {
    slug: "crane",
    code: "Crane",
    displayName: "Crane",
    description:
      "Mobile and crawler cranes — reach charts matter; sellers advertise capacities plainly.",
    imageUrl: `https://images.unsplash.com/photo-1503387762-592deb58ef4e?${q}`,
    sortOrder: 21,
  },
  {
    slug: "forklift",
    code: "Forklift",
    displayName: "Forklift",
    description:
      "Warehouse and yard forklifts — diesel, electric, and LPG options classified consistently.",
    imageUrl: `https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?${q}`,
    sortOrder: 22,
  },
  {
    slug: "road-roller",
    code: "RoadRoller",
    displayName: "Road roller",
    description:
      "Compaction rollers — infra fleets dispose surplus drums with vibration specs spelled out.",
    imageUrl: `https://images.unsplash.com/photo-1590674899484-d5640e854abe?${q}`,
    sortOrder: 23,
  },
  {
    slug: "motor-grader",
    code: "MotorGrader",
    displayName: "Motor grader",
    description:
      "Precision grading blades — highway contractors compare mouldboard widths before sourcing.",
    imageUrl: `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?${q}`,
    sortOrder: 24,
  },
  {
    slug: "concrete-mixer",
    code: "ConcreteMixer",
    displayName: "Concrete mixer",
    description:
      "Transit mixers and static drums — volume badges help buyers match pump fleets accurately.",
    imageUrl: `https://images.unsplash.com/photo-1590674899484-d5640e854abe?${q}`,
    sortOrder: 25,
  },
];
