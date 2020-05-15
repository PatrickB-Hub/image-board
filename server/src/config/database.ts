import mongoose from "mongoose";

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.PROD_DB_STRING;

// Connect to the correct database
if (process.env.NODE_ENV === "production") {
  mongoose.connect(`${prodConnection}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
} else {
  mongoose.connect(`${devConnection}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
}