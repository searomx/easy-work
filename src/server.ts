import express from "express";
import passport from "passport";

import articlesRouter from "./modules/articles/articles.routes";
import googleAuthRouter from "./modules/authentication/googleAuth.routes";
import authenticationRoutes from "./modules/authentication/authentication.routes";
import authorizationRoutes from "./modules/authorization/authorization.routes";
import followingRoutes from "./modules/following/following.routes";
import "./modules/authentication/passport"; // Import the Passport configuration
import { errorHandler } from "./middleware/errorHandler";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(passport.initialize() as any);
  app.use(errorHandler);

  app.get("/healthcheck", (_req, res) => {
    res.send("A API está ativa e funcionando!");
  });

  app.use("/authentication", authenticationRoutes);
  app.use("/authentication", googleAuthRouter);
  app.use("/authorization", authorizationRoutes);
  app.use("/articles", articlesRouter);
  app.use("/following", followingRoutes);
  return app;
}

export default createServer;
