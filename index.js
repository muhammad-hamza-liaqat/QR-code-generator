import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import qrRoutes  from "./routes/qrRoutes.js";
app.use("/api", qrRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost${process.env.PORT}/`);
});
