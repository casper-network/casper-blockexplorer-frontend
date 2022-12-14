import { PORT } from "./config";
import app from "./app";

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
