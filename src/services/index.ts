import { Express } from "express";

import events from "./events/routes";
import webhooks from "./webhooks/routes";

export default (app: Express) => {
  events(app);
  webhooks(app);
};
