/**
 * Hero / marketing chips only — full filter list is `vehicleTypes`.
 * Keep in sync with Web/UI/gadinodi/lib/vehicle-types.ts (`homepageVehicleChips`).
 */
export const homepageVehicleChips = [
  "Bicycle",
  "Scooter",
  "Motorcycle",
  "Hatchback",
  "SUV",
  "Van",
  "Pickup",
  "Tipper",
  "Excavator",
  "Forklift",
] as const;

/** Canonical vehicle / equipment categories (keep in sync with Web/UI/gadinodi/lib/vehicle-types.ts). */
export const vehicleTypes = [
  // Personal mobility
  "Bicycle",
  "EBike",
  "Scooter",
  "Motorcycle",
  // Passenger cars & vans
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  // Light commercial
  "Pickup",
  "MiniTruck",
  // Heavy commercial
  "Truck",
  "Tipper",
  "Trailer",
  "Bus",
  // Construction & industrial equipment
  "Excavator",
  "Bulldozer",
  "Loader",
  "Crane",
  "Forklift",
  "RoadRoller",
  "MotorGrader",
  "ConcreteMixer",
] as const;

export type VehicleBodyStyle = (typeof vehicleTypes)[number];

/** @deprecated Use vehicleTypes */
export const bodyStyles = vehicleTypes;

export const vehicleConditions = ["New", "Used"] as const;
export type VehicleCondition = (typeof vehicleConditions)[number];

export const fuelTypes = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "CNG",
  "Other",
] as const;
export type VehicleFuel = (typeof fuelTypes)[number];

export const transmissionTypes = ["Automatic", "Manual"] as const;
export type VehicleTransmission = (typeof transmissionTypes)[number];

/** Spare parts filter chips — keep in sync with seed categories where possible. */
export const sparePartCategories = [
  "Brakes & steering",
  "Engine & drivetrain",
  "Filters & service",
  "Electrical & lighting",
  "Suspension",
  "Body & glass",
  "Tyres & wheels",
] as const;
export type SparePartCategory = (typeof sparePartCategories)[number];
