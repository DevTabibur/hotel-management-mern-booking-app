import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import myHotelRoutes from "./routes/my-hotels.routes";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECT_DEVELOPMENT_URI as string) // just console that, for check e2e db test for automated connection
.then(() =>
  console.log(
    "Connected to database",
    process.env.MONGODB_CONNECT_DEVELOPMENT_URI
  )
);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // only accept this url
    credentials: true,
  })
);

// to server static files e.g front end project
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// all api's
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/my-hotels", myHotelRoutes)

app.get("*", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(5000, () => {
  console.log("server is listening on port : 5000");
});
