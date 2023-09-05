import mongoose from "mongoose";

let isConnected = false; // track the connection

// mongoDB connections

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb connected.");
    return;
  }
  // if not we setup ed the try and catch method
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // if this executed successfully we set isConnected true
    isConnected = true;
    console.log("MongoDb connected..");
  } catch (error) {
    console.log(error);
  }
};
