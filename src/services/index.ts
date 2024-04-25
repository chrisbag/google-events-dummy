import { Express } from "express";

import events from "./events/routes";

export default (app: Express) => {
  events(app);
};
