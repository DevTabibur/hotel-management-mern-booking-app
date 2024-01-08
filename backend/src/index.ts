import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECT_DEVELOPMENT_URI as string); // just console that, for check e2e db test for automated connection
// .then(() =>
//   console.log(
//     "Connected to database",
//     process.env.MONGODB_CONNECT_DEVELOPMENT_URI
//   )
// );

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

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Project is running and API is working",
  });
});

app.listen(5000, () => {
  console.log("server is listening on port : 5000");
});
