import express from "express";
import {GenerateQRcode} from "../controllers/qrController.js";
const qrRoutes = express.Router();

qrRoutes.route("/generate-qr").get(GenerateQRcode);

export default qrRoutes