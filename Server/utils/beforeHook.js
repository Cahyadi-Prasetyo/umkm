// utils/beforeHook.js
import Restaurant from "../models/restaurant.js";

export const beforeHook = async (req) => {
  try {
    if (req.payload?.restaurantId) {
      const rest = await Restaurant.findByPk(req.payload.restaurantId);
      req.payload._restaurantName = rest?.name || "restaurant";
    }
  } catch (error) {
    console.error("Error in beforeHook:", error);
    // Don't throw, just continue with default value
    req.payload._restaurantName = "restaurant";
  }

  return req;
};
