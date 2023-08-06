import User from "../models/User";
import Vehicle from "../models/Vehicle";
import Role from "../models/Role";

export const hasVehicleAccess = (
  vehicle: Vehicle,
  user: User,
  userRole?: Role | null,
  write: boolean = false
) => {
  return (
    vehicle.userId === user.id ||
    (!write && userRole && userRole.name === "superuser")
  );
};
