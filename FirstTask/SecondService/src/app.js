import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import AppDataSource from "./config/database.js";
import ActionLog from "./entities/ActionLog.js";
import ActionLogRepository from "./repositories/ActionLogRepository.js";
import ActionLogService from "./services/ActionLogService.js";
import ActionLogController from "./controllers/ActionLogController.js";
import ActionLogRoutes from "./routes/ActionLogRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const repository = new ActionLogRepository(AppDataSource);
    const service = new ActionLogService(repository);
    const controller = new ActionLogController(service);

    app.use("/api", ActionLogRoutes(controller));
  })
  .catch((error) => console.error("Database connection error:", error));

export default app;
