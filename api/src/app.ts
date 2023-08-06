import { config } from "dotenv";
import express from "express";
import cors from "cors";

import router from "./routes";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const BASE_PATH = process.env.BASE_PATH || "/api";
app.use(BASE_PATH, router);

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || "http://localhost";

app.listen(PORT, () =>
  console.log(`Server running on ${BASE_URL}:${PORT}${BASE_PATH}`)
);
