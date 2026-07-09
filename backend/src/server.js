import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analysisRoutes from "./routes/analysis.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analysisRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("AI Investment Research Agent Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});