import express from "express";
import morgan from "morgan";
import cors from "cors";

import testRoute from "./routes/testRoute.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import webMessageRoutes from "./routes/webMessageRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

/* middlewares */
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

/* routes */
app.use("/api/v1/test", testRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/webmessage", webMessageRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

export default app;
