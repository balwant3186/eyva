import express from "express";
import bodyParser from "body-parser";
import memberRoutes from "./routes/memberRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api", memberRoutes);

export default app;
