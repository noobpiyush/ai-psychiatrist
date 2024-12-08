import mongoose from "mongoose";

export function db(){
    mongoose.connect(process.env.DB_URL!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
}
