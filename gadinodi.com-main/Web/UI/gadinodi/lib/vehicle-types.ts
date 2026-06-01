/**
 * Mirror of API `catalog.constants.ts` vehicleTypes — keep lists aligned when adding categories.
 */
export const vehicleTypes = [
  "Bicycle",
  "EBike",
  "Scooter",
  "Motorcycle",
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Pickup",
  "MiniTruck",
  "Truck",
  "Tipper",
  "Trailer",
  "Bus",
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

/** Same order as API `homepageVehicleChips` */
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
