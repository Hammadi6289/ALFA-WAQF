import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log(
      `Mongodb database connected ${mongoose.connection.host}`.bgMagenta
    );
  });
  await mongoose.connect(`${process.env.MONGO_LOCAL_URI}/alfa-waqf`);
  console.log(mongoose.connection.name.bgBlue);
};
export default connectDB;
