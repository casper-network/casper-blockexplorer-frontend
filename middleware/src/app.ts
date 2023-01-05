import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

export default app;
