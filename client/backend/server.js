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
import careerRoutes from "./routes/careerRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import connectDB from "./config/db.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();
//database connection
connectDB();

//rest object
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Blocks NoSQL injection in body, query, params
app.use(morgan("dev"));
app.use(helmet());
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CLIENT_URL,
      process.env.ADMIN_PANEL_URL,
      "https://alfalah-waqf-*.vercel.app", //Also allow preview deployments
      "https://alfalah-dashboard-*.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

app.set("trust proxy", 1); // trust first proxy
// Rate limiting 429 status code ("Too Many Requests") when limits are exceeded
// protect against DDoS attacks and brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

//routes
// app.get("/", (req, res) => {
//   res.send("<h1> Node server ddd is up and running </h1>");
// });

app.use("/api/v1/test", testRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/webmessage", webMessageRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/career", careerRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/donations", donationRoutes);

app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.NODE_ENV} Mode on port: ${PORT}, `
      .yellow.bold
  );
});
