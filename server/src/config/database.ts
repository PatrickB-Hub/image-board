import mongoose from "mongoose";

const DB_STRING = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mongo:27017/${process.env.MONGO_DB_DATABASE}`

mongoose.connect(DB_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
