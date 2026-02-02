import dotenv from "dotenv";
import colors from "colors";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// DB connection
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.NODE_ENV} Mode on port: ${PORT}`
      .yellow.bold
  );
});
