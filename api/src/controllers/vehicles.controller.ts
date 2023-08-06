import { Request, Response } from "express";
import Role from "../models/Role";
import Vehicle from "../models/Vehicle";
import Coordinates from "../models/Coordinates";
import { hasVehicleAccess } from "../utils";

const VehiclesController = {
  getAllVehicles: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      let { page = 0, pageSize = 10 } = req.query;
      page = Number(page);
      pageSize = Number(pageSize);

      let vehicles: Vehicle[], totalPages: number;

      const vehicleQuery = {
        limit: pageSize,
        offset: page * pageSize,
        attributes: { exclude: ["coordinatesId"] },
        include: [
          {
            model: Coordinates,
            as: "coordinates",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        subQuery: false,
        order: ["id"],
      };

      if (user.role.name === "superuser") {
        vehicles = await Vehicle.findAll(vehicleQuery);

        const totalVehicles = await Vehicle.count();
        totalPages = Math.ceil(totalVehicles / pageSize);
      } else {
        vehicles = await Vehicle.findAll({
          where: {
            userId: user.id,
          },
          ...vehicleQuery,
        });

        const totalVehicles = await Vehicle.count({
          where: {
            userId: user.id,
          },
        });
        totalPages = Math.ceil(totalVehicles / pageSize);
      }
      const data = {
        vehicles: vehicles.map((vehicle) => {
          let write = false;
          if (user.id === vehicle.userId) {
            write = true;
          }
          return {
            ...vehicle.dataValues,
            write,
          };
        }),
        totalPages,
      };
      return res.status(200).json({ message: "All vehicles result", data });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  getVehicleById: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { vehicleId } = req.params;

      const vehicle = await Vehicle.findByPk(vehicleId, {
        attributes: { exclude: ["coordinatesId"] },
        include: [
          {
            model: Coordinates,
            as: "coordinates",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (!vehicle || !hasVehicleAccess(vehicle, user, user.role))
        return res.status(404).json({ message: "Vehicle not found" });

      return res.status(200).json({
        message: "Vehicle by id retrived succesfully",
        data: { vehicle },
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  getVehicleCoordinates: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { vehicleId } = req.params;

      const vehicle = await Vehicle.findByPk(vehicleId, {
        raw: true,
        attributes: ["userId", "coordinatesId"],
      });

      if (!vehicle || !hasVehicleAccess(vehicle, user, user.role)) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      const coordinates = await Coordinates.findByPk(vehicle.coordinatesId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      const write = user.id === vehicle.userId;

      return res.status(200).json({
        message: "Vehicle coordinates retrived succesfully",
        data: { coordinates, write },
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  createVehicle: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { name, brand, plates, color, model, image, latitude, longitude } =
        req.body;

      if (!name || !brand) {
        return res.status(400).json({
          error:
            "Missing params, you have to provide at least a name and a brand to create a vehicle. Verify and try again.",
        });
      }

      let coordinatesId: number | null = null,
        coordinates: Coordinates | undefined;
      if (latitude && longitude) {
        coordinates = await Coordinates.create({
          latitude,
          longitude,
        });
        coordinatesId = coordinates.id;
      }

      const vehicle = await Vehicle.create({
        userId: user.id,
        name,
        brand,
        plates,
        color,
        model,
        image,
        coordinatesId,
      });

      const newVehicle = {
        ...vehicle.dataValues,
        coordinates,
        coordinatesId: undefined,
      };

      return res.status(200).json({
        message: "Vehicle created successfully!",
        data: { newVehicle },
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  updateVehicle: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { vehicleId } = req.params;

      const { latitude, longitude, ...vehiclePayload } = req.body;

      const vehicle = await Vehicle.findByPk(vehicleId, {
        attributes: { exclude: ["coordinatesId"] },
      });

      if (!vehicle || !hasVehicleAccess(vehicle, user, user.role, true)) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      await vehicle.update({
        ...vehiclePayload,
      });

      return res.status(200).json({
        message: "Vehicle updated succesfully!",
        data: { vehicle },
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  updateVehicleCoordinates: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { vehicleId } = req.params;

      const { latitude, longitude } = req.body;

      const vehicle = await Vehicle.findByPk(vehicleId);

      if (!vehicle || !hasVehicleAccess(vehicle, user, user.role, true)) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      let coordinatesId: number | null = null;

      let coordinates = await Coordinates.findByPk(vehicle.coordinatesId);
      if (!coordinates) {
        coordinates = await Coordinates.create({
          latitude: latitude || "",
          longitude: longitude || "",
        });
      } else {
        await coordinates.update({ latitude, longitude });
      }
      coordinatesId = coordinates.id;

      await vehicle.update({
        coordinatesId,
      });

      return res.status(200).json({
        message: "Vehicle coordinates updated successfully!",
        data: { coordinates },
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
  deleteVehicle: async (req: Request, res: Response) => {
    try {
      const { user } = req.body.authorization;

      const { vehicleId } = req.params;

      const vehicle = await Vehicle.findByPk(vehicleId);

      if (!vehicle || !hasVehicleAccess(vehicle, user, user.role, true)) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      await vehicle.destroy();

      const coordinatesId = vehicle.coordinatesId;
      const coordinates = await Coordinates.findByPk(coordinatesId);
      if (coordinates) await coordinates.destroy();

      return res.status(200).json({ message: "Vehicle deleted succesfully!" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export { VehiclesController };
