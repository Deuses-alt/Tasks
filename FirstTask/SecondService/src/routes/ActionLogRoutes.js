import { Router } from "express";

function ActionLogRoutes(controller) {
  const router = Router();

  router.post("/logs", (req, res) => controller.createLog(req, res));
  router.get("/logs", (req, res) => controller.getLogs(req, res));

  return router;
}

export default ActionLogRoutes;
