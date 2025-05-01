import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//
import usersRoutes from "./Routes/usersRoutes.js";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//routes
app.use("/api/v1", usersRoutes);

export { app };
