import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/practiceYoutube");

const db = mongoose.connection;

db.on("error", (error) => console.log("DB erroe", error));
db.once("open", () => console.log("Conneted to DB"));
