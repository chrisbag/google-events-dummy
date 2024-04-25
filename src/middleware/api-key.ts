import { Request, Response, NextFunction } from "express";

// Define your API key
const API_KEY = "0cb3c20a-bf39-4241-b03f-cd329a484ecd";

// Middleware function to validate API key
const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api-key"];

  if (apiKey && apiKey === API_KEY) {
    // API key is valid, proceed to the next middleware or route handler
    next();
  } else {
    // API key is missing or invalid, send 401 Unauthorized response
    res.status(401).json({ error: "Unauthorized - Invalid API key" });
  }
};

export default apiKeyMiddleware;
