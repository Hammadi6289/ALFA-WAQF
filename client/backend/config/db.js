import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log(
      `Mongodb database connected ${mongoose.connection.host}`.bgMagenta
    );
  });

  // Auto-select database based on environment
  const dbURI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_LOCAL_URI // Production (Atlas)
      : process.env.MONGO_LOCAL_URI_LOCAL; // Development (Local)

  await mongoose.connect(dbURI);
  console.log(`Environment: ${process.env.NODE_ENV}`.bgCyan);
  console.log(`Database: ${mongoose.connection.name}`.bgMagenta);

  // await mongoose.connect(`${process.env.MONGO_LOCAL_URI_LOCAL}/alfa-waqf`);
  // console.log(mongoose.connection.name.bgMagenta);
};
export default connectDB;
