require("dotenv/config");
import express from "express";
import cors from "cors";
import Connect from "./database/database";
import { verifyToken } from "./middlewares/auth";

import { router } from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(verifyToken);
  }

  private database = async () => {
    await Connect();
  };

  private routes(): void {
    this.express.use(router);
  }
}

export default new App().express;
