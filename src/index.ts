import express from "express";

import apiKeyMiddleware from "./middleware/api-key";
import services from "./services";

const app = express();
const PORT = 3040;

// Middleware
app.use(express.json());
app.use(apiKeyMiddleware);

// Configures services
services(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
