import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

process.on("uncaughtException", function (err) {
  console.error("[Attention]: Unhandled Error");
  console.error(err);
  console.error("--------");
});
