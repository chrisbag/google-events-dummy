import { Express } from "express";
import { registerWebhook, getAllWebhooks } from "./controller";

export default (app: Express) => {
  app.post("/webhooks", registerWebhook);
  app.get("/webhooks", getAllWebhooks);
};
