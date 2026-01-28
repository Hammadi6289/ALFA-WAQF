import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import testRoute from "./routes/testRoute.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import webMessageRoutes from "./routes/webMessageRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
//database connection
connectDB();

//rest object
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares.
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
// app.get("/", (req, res) => {
//   res.send("<h1> Node server ddd is up and running </h1>");
// });

app.use("/api/v1/test", testRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/webmessage", webMessageRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.NODE_ENV} Mode on port: ${PORT}, `
      .yellow.bold
  );
});
