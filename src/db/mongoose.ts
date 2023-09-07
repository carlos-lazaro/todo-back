import mongoose from "mongoose";

async function initMongoose() {
  mongoose.connection.on("connecting", function () {
    console.log("MongoDB: Connecting");
  });

  mongoose.connection.on("error", function () {
    console.log("MongoDB: Error");
    void mongoose.disconnect();
  });

  mongoose.connection.on("open", function () {
    console.log("MongoDB: Connected");
  });

  mongoose.connection.on("reconnected", function () {
    console.log("MongoDB: Connection Restablished");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("MongoDB: Disconnected");
  });

  await mongoose.connect(process.env.MONGODB_URL ?? "");
}

export { initMongoose };
