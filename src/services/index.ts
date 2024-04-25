import { Express } from "express";
import events from "./events/events";

export default (app: Express) => {
  events(app);
};
