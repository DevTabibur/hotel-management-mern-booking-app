import express, { Request, Response } from "express";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth.middleware";
import Hotel from "../models/hotels.model";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      "bookings.userId": req.userId,
    }).lean();

    const results = hotels.map((hotel: any) => {
      const userBookings = (hotel.bookings || []).filter(
        (booking: any) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel,
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
