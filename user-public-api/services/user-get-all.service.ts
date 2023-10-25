import express, { Application, Request, Response } from "express";
import axios from 'axios';
import { securityService } from "./security.service";

const app: Application = express();

class UserGetAllService {
  getAll = async () => {
    return await axios.get(`${process.env.user_crud_api}/user`);
  };

  route = () => {
    app.use(securityService.verify);
    app.get("/user", async (req: Request, res: Response) => {
      try {
        const result = await this.getAll();

        res.send(result.data);
      } catch (error) {
        console.log(error);
        
        res.status(400).send({
          ok: false,
          message: error,
        });
      }
    });

    return app;
  };
}

export const userGetAllService = new UserGetAllService();