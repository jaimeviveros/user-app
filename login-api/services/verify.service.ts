import express, { Application, Request, Response } from "express";
import { jwtGenerateService } from "./jwt-generate.service";

const app: Application = express();

const encode_key = "JULES";

class VerifiyService {
  route = () => {
    app.use("/verify", jwtGenerateService.requireJwtMiddleware);

    app.get("/verify", (req: Request, res: Response) => {
      try {
        console.log('Request recibido');
        
        res.send({ok : true});
      } catch (error) {
        res.status(400).send({
          ok: false,
          message: error,
        });
      }
    });

    return app;
  };
}

export const verifyService = new VerifiyService();
